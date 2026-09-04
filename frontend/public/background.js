
/* global chrome */


const HF_API_KEY = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_HF_API_KEY) || '';
const HF_CHAT_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";


async function callAI(fields, resume) {
  const compactFields = (fields || []).map((field) => ({
    index: field.index,
    tag: field.tag,
    type: field.type,
    name: field.name,
    id: field.id,
    placeholder: field.placeholder,
    label: field.label
  }));

  const prompt = `Map job application form fields to resume data.

Resume JSON:
${JSON.stringify(resume || {})}

Form Fields JSON:
${JSON.stringify(compactFields)}

Return only valid JSON in this format:
{
  "0": "name",
  "1": "email",
  "2": "phone"
}

Skip fields you are unsure about.`;

  try {
    const response = await fetch(
      HF_CHAT_URL,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: HF_MODEL,
          messages: [
            {
              role: "system",
              content: "You map job application fields to resume keys and return only a JSON object."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0,
          max_tokens: 120
        })
      }
    );

    const rawText = await response.text();
    let result = null;

    try {
      result = rawText ? JSON.parse(rawText) : null;
    } catch (_err) {
      result = null;
    }

    if (!response.ok) {
      return { mapping: {}, raw: result, rawText, aiAvailable: false };
    }

    const text =
      result?.choices?.[0]?.message?.content ||
      result?.choices?.[0]?.text ||
      result?.[0]?.generated_text ||
      result?.generated_text ||
      rawText ||
      "";
    const match = typeof text === "string" ? text.match(/\{[\s\S]*\}/) : null;

    let mapping = {};
    try {
      if (match) mapping = JSON.parse(match[0]);
    } catch (err) {
      console.warn("callAI: failed to parse mapping JSON from model output", err, text);
      mapping = {};
    }

    return { mapping, raw: result, rawText: text, aiAvailable: true };
  } catch (err) {
    return {
      mapping: {},
      raw: null,
      rawText: err instanceof Error ? err.message : String(err),
      aiAvailable: false
    };
  }
}

// Simple heuristic mapper: looks for keywords in field label/name/id/placeholder
function heuristicMap(fields, resume) {
  const keywords = {
    company: ["company", "employer", "organization"],
    university: ["university", "college", "school", "institution"],
    email: ["email", "e-mail", "mail"],
    phone: ["phone", "mobile", "telephone", "tel"],
    linkedIn: ["linkedin", "linked in"],
    github: ["github"],
    skills: ["skill", "skills"],
    workExperience: ["experience", "work"],
    education: ["degree", "education"],
    name: ["full name", "your name", "candidate name", "applicant name", "name"],
  };

  const mapping = {};

  fields.forEach((f, idx) => {
    const hay = ((f.label || "") + " " + (f.name || "") + " " + (f.id || "") + " " + (f.placeholder || "")).toLowerCase();
    for (const resumeKey of Object.keys(keywords)) {
      for (const kw of keywords[resumeKey]) {
        if (hay.includes(kw)) {
          mapping[idx] = resumeKey;
          return;
        }
      }
    }
  });

  return mapping;
}

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "analyze_form") {
    // Acknowledge receipt immediately so the sender's callback doesn't show a
    // "message port closed" error while we continue async work.
    try {
      sendResponse && sendResponse({ status: "received" });
    } catch (e) {
      console.warn("background.js sendResponse threw:", e);
    }

    // Return true to indicate we will respond asynchronously (keeps the
    // message channel open for service worker background scripts).
    // We still continue processing below and forward to the tab.
    (async () => {
      try {
        console.log("background.js received analyze_form", { fieldsCount: (msg.fields || []).length, resumeKeys: Object.keys(msg.resume || {}) });

        const aiResult = await callAI(msg.fields, msg.resume);
        const mapping = aiResult.mapping || {};
        if (aiResult.aiAvailable) {
          console.log("background.js AI mapping result:", mapping, "raw:", aiResult.raw, "rawText:", aiResult.rawText);
        } else {
          console.log("background.js AI unavailable, trying heuristic fallback");
        }

        let mappingToSend = mapping;
        let usedFallback = false;
        let fallback = null;
        if (!mapping || Object.keys(mapping).length === 0) {
          fallback = heuristicMap(msg.fields || [], msg.resume || {});
          if (fallback && Object.keys(fallback).length > 0) {
            mappingToSend = fallback;
            usedFallback = true;
            console.log("background.js using heuristic fallback mapping:", fallback);
          }
        }

        if (!sender || !sender.tab || !sender.tab.id) {
          console.warn("background.js: sender.tab.id is missing — cannot forward mapping to tab", sender);
          return;
        }

        chrome.tabs.sendMessage(sender.tab.id, {
          action: "ai_autofill",
          mapping: mappingToSend,
          resume: msg.resume,
          debug: { rawAIResult: aiResult.raw, rawAIText: aiResult.rawText, usedFallback, fallbackMapping: fallback },
        });
        console.log("background.js forwarded mapping to tab", sender.tab.id);
      } catch (err) {
        console.error("AI Autofill error:", err);
      }
    })();

    return true;
  }
});
