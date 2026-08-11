// services/configs/calorieEstimator.js

const calorieEstimatorConfig = {
  id: 'calorieEstimator',
  name: 'Calorie Estimator',
  description: 'Photo of a meal → estimated calories and macros',
  icon: 'nutrition-outline',

  inputType: 'image',
  expectsJSON: true,

  extraOptions: [],

  buildPrompt: () => {
    return `
You are a nutrition assistant. Look at the meal in the photo and estimate its nutritional content.

Give your best estimate even if you're not 100% sure — say so in the notes if the estimate is rough.

Respond ONLY with valid JSON, no markdown, no preamble, in this exact shape:
{
  "mealGuess": "short name of the meal/dish",
  "calories": 450,
  "protein": 20,
  "carbs": 50,
  "fat": 15,
  "notes": "any caveats about the estimate, or portion size assumptions"
}
    `.trim();
  },

  resultLayout: 'macros',
};

export default calorieEstimatorConfig;