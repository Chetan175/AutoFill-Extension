
/* global chrome */


const HF_API_KEY = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_HF_API_KEY) || '';


async function callAI(fields, resume) {
  const prompt = `
You are an AI that maps job application form fields to resume data.

Resume JSON:
${JSON.stringify(resume, null, 2)}

Form Fields JSON:
${JSON.stringify(fields, null, 2)}

Return ONLY valid JSON in this format:
{
  "0": "name",
  "1": "email",
  "2": "phone"
}

Skip fields you are unsure about.
`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { temperature: 0 }
      })
    }
  );

  const result = await response.json();

  // Be permissive about where the model text might live
  const text = result?.[0]?.generated_text || result?.generated_text || JSON.stringify(result || "");
  const match = typeof text === "string" ? text.match(/\{[\s\S]*\}/) : null;

  let mapping = {};
  try {
    if (match) mapping = JSON.parse(match[0]);
  } catch (err) {
    console.warn("callAI: failed to parse mapping JSON from model output", err, text);
    mapping = {};
  }

  // Return mapping plus raw result for debugging
  return { mapping, raw: result, rawText: text };
}

// Simple heuristic mapper: looks for keywords in field label/name/id/placeholder
function heuristicMap(fields, resume) {
  const keywords = {
    name: ["name", "full name", "your name"],
    email: ["email", "e-mail", "mail"],
    phone: ["phone", "mobile", "telephone", "tel"],
    linkedIn: ["linkedin", "linked in"],
    github: ["github"],
    skills: ["skill", "skills"],
    workExperience: ["experience", "work"],
    education: ["education", "school", "college", "degree"],
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
        console.log("background.js AI mapping result:", mapping, "raw:", aiResult.raw, "rawText:", aiResult.rawText);

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

        chrome.tabs.sendMessage(
          sender.tab.id,
          {
            action: "ai_autofill",
            mapping: mappingToSend,
            resume: msg.resume,
            debug: { rawAIResult: aiResult.raw, rawAIText: aiResult.rawText, usedFallback, fallbackMapping: fallback },
          },
          (resp) => {
            if (chrome.runtime.lastError)
              console.error("background.js chrome.tabs.sendMessage error:", chrome.runtime.lastError);
            else console.log("background.js forwarded mapping to tab", sender.tab.id, resp);
          }
        );
      } catch (err) {
        console.error("AI Autofill error:", err);
      }
    })();

    return true;
  }
});
