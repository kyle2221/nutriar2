'use client';

import React, { useState, useMemo } from 'react';
import { useMealStore } from '@/store/meal-store';
import CalorieGoalChart from '@/components/dashboard/calorie-goal-chart';
import MacrosOverview from '@/components/dashboard/macros-overview';
import MealLog from '@/components/dashboard/meal-log';
import ProgressChart from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type TimeRange = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'MAX';

// Helper to generate mock data
const generateMockData = (days: number, baseCalories: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const calories = baseCalories + Math.floor(Math.random() * 401) - 200; // Fluctuate by +/- 200
    data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), calories });
  }
  return data;
};

export default function DashboardPage() {
  const { meals } = useMealStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('5D');

  const todayTotals = useMemo(() => {
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

  const nutritionData = useMemo(() => {
    return {
      calories: { value: todayTotals.calories, goal: 2500 },
      macros: {
        protein: { value: todayTotals.protein, goal: 150 },
        carbs: { value: todayTotals.carbs, goal: 280 },
        fat: { value: todayTotals.fat, goal: 70 },
      },
    };
  }, [todayTotals]);

  const progressData = useMemo(() => {
    const baseCals = 2400;
    const data1D = [{ date: 'Today', calories: todayTotals.calories }];
    const data5D = generateMockData(5, baseCals);
    data5D[data5D.length - 1].calories = todayTotals.calories; // Ensure today's data is accurate

    switch (timeRange) {
      case '1D': return data1D;
      case '5D': return data5D;
      case '1M': return generateMockData(30, baseCals);
      case '6M': return generateMockData(180, baseCals);
      case '1Y': return generateMockData(365, baseCals);
      case '5Y': return generateMockData(365 * 5, baseCals);
      case 'MAX': return generateMockData(365 * 5, baseCals); // Max is same as 5Y for demo
      default: return data5D;
    }
  }, [timeRange, todayTotals.calories]);

  const timeRanges: TimeRange[] = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'MAX'];

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
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Progress</CardTitle>
                <CardDescription>Your calorie intake over time.</CardDescription>
            </div>
            <div className="flex items-center gap-1 p-1 bg-muted rounded-md">
                {timeRanges.map((range) => (
                    <Button 
                        key={range}
                        size="sm"
                        variant={timeRange === range ? 'default' : 'ghost'}
                        onClick={() => setTimeRange(range)}
                        className="px-3 py-1 h-8"
                    >
                        {range}
                    </Button>
                ))}
            </div>
        </CardHeader>
        <CardContent>
          <ProgressChart data={progressData} />
        </CardContent>
      </Card>
      <MealLog meals={meals} />
    </div>
  );
}
