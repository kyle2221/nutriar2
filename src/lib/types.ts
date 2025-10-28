export type Recipe = {
  id: string;
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  reasoning: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | 'AI-Generated' | 'Pantry';
  imageHint: string;
  isFavorited: boolean;
  nutritionalInformation?: string; // This is a JSON string, made optional
  suitabilityScore?: number;
};

export type Meal = {
  id?: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
