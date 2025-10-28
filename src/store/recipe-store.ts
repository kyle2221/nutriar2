'use client';

import { create } from 'zustand';
import { Recipe } from '@/lib/types';
import { STATIC_RECIPES } from '@/lib/recipes';
import type { SuggestRecipesOutput } from '@/ai/flows/suggest-recipes-based-on-goals';
import type { GenerateRecipeFromIngredientsOutput } from '@/ai/flows/generate-recipe-from-ingredients';

type RecipeState = {
  recipes: Recipe[];
  getRecipeById: (id: string) => Recipe | undefined;
  toggleFavorite: (id: string) => void;
  addAiRecipes: (newRecipes: SuggestRecipesOutput['suggestedRecipes']) => void;
  addPantryRecipes: (newRecipes: GenerateRecipeFromIngredientsOutput['recipes']) => Recipe[];
};

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: STATIC_RECIPES,

  getRecipeById: (id) => {
    return get().recipes.find((recipe) => recipe.id === id);
  },

  toggleFavorite: (id) => {
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorited: !recipe.isFavorited } : recipe
      ),
    }));
  },

  addAiRecipes: (newRecipes) => {
    const formattedRecipes: Recipe[] = newRecipes.map((recipe, index) => ({
      ...recipe,
      id: `ai-${Date.now()}-${index}`,
      category: 'AI-Generated',
      imageHint: 'ai recipe', 
      isFavorited: false,
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions],
    }));

    set((state) => ({
      recipes: [...formattedRecipes, ...state.recipes],
    }));
  },

  addPantryRecipes: (newRecipes) => {
    const formattedRecipes: Recipe[] = newRecipes.map((recipe, index) => ({
      ...recipe,
      id: `pantry-${Date.now()}-${index}`,
      category: 'Pantry',
      imageHint: 'ai recipe',
      isFavorited: false,
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [recipe.instructions],
    }));

    set((state) => ({
      recipes: [...formattedRecipes, ...state.recipes],
    }));

    return formattedRecipes;
  },

}));
