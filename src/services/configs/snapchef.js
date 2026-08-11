// services/configs/snapchef.js

const snapChefConfig = {
  id: 'snapchef',
  name: 'SnapChef',
  description: 'Photo of your fridge/pantry → recipe suggestions',
  icon: 'restaurant-outline',

  inputType: 'image',
  expectsJSON: true,

  extraOptions: [
    {
      key: 'cuisine',
      label: 'Cuisine style',
      type: 'select',
      choices: [
        { label: 'Any', value: 'any' },
        { label: 'Indian', value: 'indian' },
        { label: 'Continental', value: 'continental' },
      ],
      default: 'any',
    },
  ],

  buildPrompt: ({ options }) => {
    const cuisine = options.cuisine && options.cuisine !== 'any'
      ? `Prefer ${options.cuisine} cuisine recipes where possible.`
      : '';

    return `
You are SnapChef. Look at the photo of ingredients (fridge or pantry) and suggest recipes that can be made using mostly what's visible.

${cuisine}

Respond ONLY with valid JSON, no markdown, no preamble, in this exact shape:
{
  "detectedIngredients": ["ingredient1", "ingredient2"],
  "recipes": [
    {
      "name": "recipe name",
      "description": "1 sentence description",
      "ingredientsUsed": ["ingredient1", "ingredient2"],
      "missingIngredients": ["anything needed that wasn't visible"],
      "steps": ["step 1", "step 2"]
    }
  ]
}
    `.trim();
  },

  resultLayout: 'recipe',
};

export default snapChefConfig;