'use client';

import { create } from 'zustand';
import { Meal } from '@/lib/types';

const initialMeals: Meal[] = [
  {
    id: 1,
    name: 'Oatmeal with Berries',
    calories: 350,
    protein: 10,
    carbs: 60,
    fat: 8,
    imageHint: 'oatmeal bowl',
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    calories: 500,
    protein: 40,
    carbs: 30,
    fat: 25,
    imageHint: 'salad',
  },
  {
    id: 3,
    name: 'Apple Slices with Peanut Butter',
    calories: 250,
    protein: 5,
    carbs: 30,
    fat: 15,
    imageHint: 'fruit',
  },
];

type MealState = {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
};

export const useMealStore = create<MealState>((set) => ({
  meals: initialMeals,
  addMeal: (meal) =>
    set((state) => ({
      meals: [...state.meals, { ...meal, id: Date.now() }],
    })),
}));
