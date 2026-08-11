// services/configs/outfitPlanner.js

const outfitPlannerConfig = {
  id: 'outfitPlanner',
  name: 'Outfit Planner',
  description: 'Photos of clothing → outfit combos for the occasion',
  icon: 'shirt-outline',

  inputType: 'image',
  expectsJSON: true,

  extraOptions: [
    {
      key: 'occasion',
      label: 'Occasion',
      type: 'select',
      choices: [
        { label: 'Casual', value: 'casual' },
        { label: 'Work', value: 'work' },
        { label: 'Party', value: 'party' },
      ],
      default: 'casual',
    },
  ],

  buildPrompt: ({ options }) => {
    const occasion = options.occasion || 'casual';

    return `
You are Outfit Planner. Look at the clothing item(s) in the photo and suggest outfit combinations suitable for a "${occasion}" occasion.

Respond ONLY with valid JSON, no markdown, no preamble, in this exact shape:
{
  "detectedItems": ["item1", "item2"],
  "outfits": [
    {
      "name": "short outfit name",
      "pieces": ["item1", "item2"],
      "reasoning": "why this combo works for the occasion"
    }
  ]
}
    `.trim();
  },

  resultLayout: 'outfit',
};

export default outfitPlannerConfig;