export type RecipeSuggestion = {
  recipeName: string;
  ingredients: string[];
  instructions: string;
  nutritionalInformation: string; // This is a JSON string
  suitabilityScore: number;
  reasoning: string;
};

export type Meal = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
