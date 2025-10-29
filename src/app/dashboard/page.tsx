'use client';

import React from 'react';
import { useMealStore } from '@/store/meal-store';
import CalorieGoalChart from '@/components/dashboard/calorie-goal-chart';
import MacrosOverview from '@/components/dashboard/macros-overview';
import MealLog from '@/components/dashboard/meal-log';
import ProgressChart from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  const { meals } = useMealStore();

  // This is a more realistic calculation of today's totals
  const todayTotals = React.useMemo(() => {
    return meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const nutritionData = React.useMemo(() => {
    return {
      calories: { value: todayTotals.calories, goal: 2500 },
      macros: {
        protein: { value: todayTotals.protein, goal: 150 },
        carbs: { value: todayTotals.carbs, goal: 280 },
        fat: { value: todayTotals.fat, goal: 70 },
      },
    };
  }, [todayTotals]);

  // Mock data for the weekly progress chart
  const weeklyData = [
      { date: 'Mon', calories: 2300 },
      { date: 'Tue', calories: 2450 },
      { date: 'Wed', calories: 2200 },
      { date: 'Thu', calories: 2600 },
      { date: 'Fri', calories: 2550 },
      { date: 'Sat', calories: 2700 },
      { date: 'Sun', calories: todayTotals.calories },
  ];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
            <CalorieGoalChart nutritionData={nutritionData} />
        </div>
         <div className="lg:col-span-3">
             <MacrosOverview nutritionData={nutritionData} />
        </div>
      </div>
       <Card className="col-span-1 lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Weekly Progress</CardTitle>
          <CardDescription>Your calorie intake over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressChart data={weeklyData} />
        </CardContent>
      </Card>
      <MealLog meals={meals} />
    </div>
  );
}
