/* global chrome */
console.log("Content script loaded");

// 1️⃣ Receive autofill request from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "autofill" && message.data) {
    const resume = message.data;
    console.log("content.js received autofill request", { resume });

    // Extract form context
    const fields = [];
    document.querySelectorAll("input, textarea, select").forEach((el, index) => {
      const label =
        el.labels?.[0]?.innerText ||
        el.closest("label")?.innerText ||
        el.getAttribute("aria-label") ||
        "";

      fields.push({
        index,
        tag: el.tagName,
        type: el.type,
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        label: label
      });
    });

    // Send data to background.js for AI processing
    chrome.runtime.sendMessage(
      {
        action: "analyze_form",
        fields,
        resume,
      },
      (resp) => {
        if (chrome.runtime.lastError) {
          console.error("content.js runtime.sendMessage error:", chrome.runtime.lastError);
        } else {
          console.log("content.js sent form for analysis, background response:", resp);
        }
      }
    );

    sendResponse({ status: "sent_to_background" });
  }
});

// 2️⃣ Receive AI mapping and autofill
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "ai_autofill") {
    console.log("content.js received ai_autofill", { mapping: msg.mapping, resumeKeys: Object.keys(msg.resume || {}) });

    // If debug info present, log it for diagnostics
    if (msg.debug) console.log("content.js debug:", msg.debug);

    const inputs = document.querySelectorAll("input, textarea, select");

    // Validate mapping keys: prefer numeric indices. Ignore non-numeric keys.
    const mappingObj = msg.mapping || {};
    const numericEntries = Object.entries(mappingObj).filter(([k]) => {
      const n = Number.isFinite ? Number(k) : parseInt(k, 10);
      return !Number.isNaN(n);
    });

    if (numericEntries.length > 0) {
      numericEntries.forEach(([indexRaw, resumeKey]) => {
        const index = parseInt(indexRaw, 10);
        const input = inputs[index];
        if (!input) {
          console.warn(`No input found at index ${index} — skipping`);
          return;
        }

        const value = (msg.resume && msg.resume[resumeKey]) || "";
        console.log(`Filling input[${index}] (name=${input.name} id=${input.id} type=${input.type}) with resume['${resumeKey}'] ->`, value);

        try {
          input.focus && input.focus();
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (err) {
          console.error("Error filling input", err);
        }
      });
    } else {
      console.warn("content.js: no numeric mapping entries to apply — attempting name/id/label fallback");

      // Build searchable list of inputs with their context text
      const inputInfos = Array.from(inputs).map((el) => {
        const label = el.labels?.[0]?.innerText || el.closest("label")?.innerText || el.getAttribute("aria-label") || "";
        return {
          el,
          hay: (label + " " + (el.name || "") + " " + (el.id || "") + " " + (el.placeholder || "")).toLowerCase(),
        };
      });

      const resumeKeys = Object.keys(msg.resume || {});

      // synonyms for common fields
      const synonyms = {
        phone: ["phone", "mobile", "tel", "telephone"],
        email: ["email", "e-mail", "mail"],
        name: ["name", "full name"],
        linkedIn: ["linkedin", "linked in"],
        github: ["github"],
        skills: ["skill", "skills"],
        workExperience: ["experience", "work"],
        education: ["education", "school", "college", "degree"],
      };

      resumeKeys.forEach((rKey) => {
        const value = msg.resume[rKey];
        if (!value) return;
        const keyLower = rKey.toLowerCase();
        const keysToMatch = [keyLower].concat(synonyms[rKey] || [], synonyms[keyLower] || []);

        let filled = false;
        for (const info of inputInfos) {
          for (const km of keysToMatch) {
            if (info.hay.includes(km)) {
              try {
                info.el.focus && info.el.focus();
                info.el.value = value;
                info.el.dispatchEvent(new Event("input", { bubbles: true }));
                info.el.dispatchEvent(new Event("change", { bubbles: true }));
                console.log(`Fallback: filled input (name=${info.el.name} id=${info.el.id}) with resume['${rKey}'] ->`, value);
                filled = true;
                break;
              } catch (err) {
                console.error("Fallback: error filling input", err);
              }
            }
          }
          if (filled) break;
        }
      });
    }

    alert("AI Autofill complete 🚀");
  }
});
