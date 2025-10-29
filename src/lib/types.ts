export type Review = {
    author: string;
    avatarUrl: string;
    rating: number;
    comment: string;
};

export type Recipe = {
  id: string;
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  reasoning: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert' | 'AI-Generated' | 'Pantry';
  imageHint: string;
  isFavorited: boolean;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  suitabilityScore?: number;
  reviews?: Review[];
  rating: number;
  healthScore: number;
};

export type Meal = {
  id?: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageHint?: string;
};
