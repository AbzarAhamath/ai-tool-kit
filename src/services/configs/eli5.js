// services/configs/eli5.js

const DIFFICULTY_PROMPTS = {
  toddler: 'Explain it like I am 5 years old, using very simple words and a fun analogy.',
  teen: 'Explain it like I am a teenager — simple language, but you can use everyday technical terms.',
  adult: 'Explain it clearly and concisely for a curious adult with no background in the topic.',
};

const eli5Config = {
  id: 'eli5',
  name: 'ELI5',
  description: 'Paste any text and get a simple explanation',
  icon: 'bulb-outline', // Ionicons name

  inputType: 'text', // 'text' | 'image' | 'multi-image'
  expectsJSON: true,

  extraOptions: [
    {
      key: 'difficulty',
      label: 'Explain like I\'m...',
      type: 'select',
      choices: [
        { label: 'A Toddler', value: 'toddler' },
        { label: 'A Teenager', value: 'teen' },
        { label: 'An Adult', value: 'adult' },
      ],
      default: 'teen',
    },
  ],

  buildPrompt: ({ userText, options }) => {
    const difficulty = options.difficulty || 'teen';
    const instruction = DIFFICULTY_PROMPTS[difficulty];

    return `
You are ELI5, an assistant that simplifies complex text.

${instruction}

Text to explain:
"""
${userText}
"""

Respond ONLY with valid JSON, no markdown, no preamble, in this exact shape:
{
  "summary": "one sentence overview",
  "explanation": "the full simplified explanation, 3-5 short paragraphs",
  "analogy": "a short relatable analogy if useful, or empty string if not needed",
  "keyTerms": [
    { "term": "a technical term from the original text", "meaning": "simple definition" }
  ]
}
    `.trim();
  },

  resultLayout: 'explanation', // maps to ResultRenderers/ExplanationResult.jsx
};

export default eli5Config;