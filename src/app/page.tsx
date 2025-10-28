'use client';

import React from 'react';
import { useMealStore } from '@/store/meal-store';
import CalorieGoalChart from '@/components/dashboard/calorie-goal-chart';
import MacrosOverview from '@/components/dashboard/macros-overview';
import MealLog from '@/components/dashboard/meal-log';

export default function DashboardPage() {
  const { meals } = useMealStore();

  const nutritionData = React.useMemo(() => {
    const totals = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return {
      calories: { value: totals.calories, goal: 2000 },
      macros: {
        protein: { value: totals.protein, goal: 120 },
        carbs: { value: totals.carbs, goal: 250 },
        fat: { value: totals.fat, goal: 60 },
      },
    };
  }, [meals]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 grid gap-4">
          <CalorieGoalChart nutritionData={nutritionData} />
        </div>
        <MacrosOverview nutritionData={nutritionData} />
      </div>
      <MealLog meals={meals} />
    </div>
  );
}
