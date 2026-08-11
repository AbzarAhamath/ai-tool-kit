// services/configs/codeExplainer.js

const codeExplainerConfig = {
  id: 'codeExplainer',
  name: 'Code Explainer',
  description: 'Paste code → line-by-line plain English explanation',
  icon: 'code-slash-outline',

  inputType: 'text',
  expectsJSON: true,

  extraOptions: [],

  buildPrompt: ({ userText }) => {
    return `
You are Code Explainer. Explain the following code in plain English, for someone learning to code.

Code:
"""
${userText}
"""

Respond ONLY with valid JSON, no markdown, no preamble, in this exact shape:
{
  "language": "detected programming language",
  "overview": "1-2 sentence summary of what this code does overall",
  "lines": [
    { "code": "the actual line or small block of code", "explanation": "plain English explanation of what it does" }
  ]
}
    `.trim();
  },

  resultLayout: 'code',
};

export default codeExplainerConfig;