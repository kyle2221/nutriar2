
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useMealStore } from '@/store/meal-store';
import CalorieGoalChart from '@/components/dashboard/calorie-goal-chart';
import MacrosOverview from '@/components/dashboard/macros-overview';
import MealLog from '@/components/dashboard/meal-log';
import ProgressChart from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type TimeRange = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'MAX';
export type Metric = 'calories' | 'protein' | 'carbs' | 'fat' | 'steps';

// Helper to generate mock data
const generateMockData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calories: 2400 + Math.floor(Math.random() * 401) - 200,
      protein: 140 + Math.floor(Math.random() * 41) - 20,
      carbs: 280 + Math.floor(Math.random() * 61) - 30,
      fat: 70 + Math.floor(Math.random() * 21) - 10,
      steps: 8000 + Math.floor(Math.random() * 4001) - 2000,
    });
  }
  return data;
};

export default function DashboardPage() {
  const { meals } = useMealStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('5D');
  const [activeMetric, setActiveMetric] = useState<Metric>('calories');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    if (!isClient) {
      return [];
    }

    const todayData = {
      date: 'Today',
      calories: todayTotals.calories,
      protein: todayTotals.protein,
      carbs: todayTotals.carbs,
      fat: todayTotals.fat,
      steps: 10520, // Mocked for today's steps
    };

    let data;
    switch (timeRange) {
      case '1D':
        data = [todayData];
        break;
      case '5D':
        data = generateMockData(5);
        break;
      case '1M':
        data = generateMockData(30);
        break;
      case '6M':
        data = generateMockData(180);
        break;
      case '1Y':
        data = generateMockData(365);
        break;
      case '5Y':
        data = generateMockData(365 * 5);
        break;
      case 'MAX':
        data = generateMockData(365 * 5);
        break; // Max is same as 5Y for demo
      default:
        data = generateMockData(5);
    }
    // Ensure today's data is accurate for ranges including today
    if (timeRange !== '1D' && data.length > 0) {
      data[data.length - 1] = {
        ...data[data.length - 1],
        ...todayData,
        date: data[data.length - 1].date,
      };
    }
    return data;
  }, [timeRange, todayTotals, isClient]);

  const timeRanges: TimeRange[] = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'MAX'];
  const metrics: { key: Metric; label: string }[] = [
    { key: 'calories', label: 'Calories' },
    { key: 'protein', label: 'Protein' },
    { key: 'carbs', label: 'Carbs' },
    { key: 'fat', label: 'Fat' },
    { key: 'steps', label: 'Steps' },
  ];

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CalorieGoalChart nutritionData={nutritionData} />
        <MacrosOverview nutritionData={nutritionData} />
      </div>
      <Card className="col-span-1 lg:col-span-4">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-headline">Progress</CardTitle>
              <CardDescription>Your metric intake over time.</CardDescription>
            </div>
            <div className="flex items-center gap-1 p-1 bg-muted rounded-md w-full sm:w-auto overflow-x-auto">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? 'default' : 'ghost'}
                  onClick={() => setTimeRange(range)}
                  className="px-3 py-1 h-8 flex-shrink-0"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {metrics.map(({ key, label }) => (
              <Button
                key={key}
                variant={activeMetric === key ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveMetric(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ProgressChart data={progressData} metric={activeMetric} />
        </CardContent>
      </Card>
      <MealLog meals={meals} />
    </div>
  );
}
