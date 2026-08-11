// services/aiService.js
// Single Gemini wrapper for all tools — text and vision calls

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-3.1-flash-lite';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function imageUriToBase64(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function callGemini({ prompt, imageUris = [] }, retries = 2) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing Gemini API key. Set EXPO_PUBLIC_GEMINI_API_KEY in .env');
  }

  const parts = [{ text: prompt }];

  for (const uri of imageUris) {
    const base64 = await imageUriToBase64(uri);
    parts.push({
      inlineData: { mimeType: 'image/jpeg', data: base64 },
    });
  }

  const body = {
    contents: [{ role: 'user', parts }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Gemini returned an empty response.');
      return text;
    }

    // if overloaded and we have retries left, wait and try again
    if (res.status === 503 && attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }

    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }
}

function parseStructuredResponse(rawText) {
  const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error('Failed to parse AI response as JSON: ' + err.message);
  }
}

export async function runAIRequest({ config, userText = '', imageUris = [], options = {} }) {
  const prompt = config.buildPrompt({ userText, options });
  const rawText = await callGemini({ prompt, imageUris });

  if (config.expectsJSON) {
    return parseStructuredResponse(rawText);
  }
  return rawText;
}

export default { runAIRequest };