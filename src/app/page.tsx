'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Flame,
  PlusCircle,
  MoreVertical,
  Zap,
  Wheat,
  Drumstick,
} from 'lucide-react';
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Meal } from '@/lib/types';

const nutritionData = {
  calories: { value: 1250, goal: 2000 },
  macros: {
    protein: { value: 80, goal: 120 },
    carbs: { value: 150, goal: 250 },
    fat: { value: 40, goal: 60 },
  },
};

const meals: Meal[] = [
  {
    id: 1,
    name: 'Oatmeal with Berries',
    calories: 350,
    protein: 10,
    carbs: 60,
    fat: 8,
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    calories: 500,
    protein: 40,
    carbs: 30,
    fat: 25,
  },
  {
    id: 3,
    name: 'Apple Slices with Peanut Butter',
    calories: 250,
    protein: 5,
    carbs: 30,
    fat: 15,
  },
];

const chartData = [
  {
    name: 'Calories',
    value: nutritionData.calories.value,
    goal: nutritionData.calories.goal,
    fill: 'hsl(var(--primary))',
  },
];

const chartConfig = {
  value: {
    label: 'Calories',
  },
} satisfies ChartConfig;

const CalorieGoalChart = () => (
  <Card className="flex flex-col items-center justify-center p-4">
    <CardHeader className="items-center p-2">
      <CardTitle className="font-headline">Calories</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[250px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
          cy="50%"
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
          <RadialBar
            dataKey="value"
            background
            cornerRadius={10}
            className="fill-primary"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
    <div className="flex flex-col items-center gap-1 text-center -mt-12 mb-4">
      <span className="text-4xl font-bold tracking-tighter">
        {nutritionData.calories.value}
      </span>
      <span className="text-sm text-muted-foreground">
        / {nutritionData.calories.goal} kcal
      </span>
    </div>
  </Card>
);

const MacroCard = ({
  title,
  value,
  goal,
  unit,
  icon: Icon,
  colorClass,
}: {
  title: string;
  value: number;
  goal: number;
  unit: string;
  icon: React.ElementType;
  colorClass: string;
}) => (
  <Card className="flex items-center p-4">
    <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg font-bold">
        {value}
        <span className="text-sm text-muted-foreground">
          /{goal}
          {unit}
        </span>
      </p>
    </div>
  </Card>
);

const MacrosOverview = () => (
  <Card>
    <CardHeader>
      <CardTitle>Macros</CardTitle>
      <CardDescription>Your macronutrient breakdown for today.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <MacroCard
        title="Protein"
        value={nutritionData.macros.protein.value}
        goal={nutritionData.macros.protein.goal}
        unit="g"
        icon={Drumstick}
        colorClass="bg-sky-500"
      />
      <MacroCard
        title="Carbohydrates"
        value={nutritionData.macros.carbs.value}
        goal={nutritionData.macros.carbs.goal}
        unit="g"
        icon={Wheat}
        colorClass="bg-orange-500"
      />
      <MacroCard
        title="Fat"
        value={nutritionData.macros.fat.value}
        goal={nutritionData.macros.fat.goal}
        unit="g"
        icon={Zap}
        colorClass="bg-purple-500"
      />
    </CardContent>
  </Card>
);

const MealLog = () => (
  <Card className="col-span-1 md:col-span-3">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Today's Meal Log</CardTitle>
          <CardDescription>A summary of your meals for today.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Log Meal
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meal</TableHead>
            <TableHead className="text-right">Calories</TableHead>
            <TableHead className="text-right">Protein (g)</TableHead>
            <TableHead className="text-right">Carbs (g)</TableHead>
            <TableHead className="text-right">Fat (g)</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell className="font-medium">{meal.name}</TableCell>
              <TableCell className="text-right">{meal.calories}</TableCell>
              <TableCell className="text-right">{meal.protein}</TableCell>
              <TableCell className="text-right">{meal.carbs}</TableCell>
              <TableCell className="text-right">{meal.fat}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 grid gap-4">
          <CalorieGoalChart />
        </div>
        <MacrosOverview />
      </div>
      <MealLog />
    </div>
  );
}
