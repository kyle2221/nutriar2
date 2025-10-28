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

type CalorieGoalChartProps = {
  nutritionData: {
    calories: { value: number; goal: number };
  };
};

const chartConfig = {
  value: {
    label: 'Calories',
  },
} satisfies ChartConfig;

const CalorieGoalChart: React.FC<CalorieGoalChartProps> = ({ nutritionData }) => {
    const chartData = [
        {
          name: 'Calories',
          value: nutritionData.calories.value,
          goal: nutritionData.calories.goal,
          fill: 'hsl(var(--primary))',
        },
      ];
    
    const percentage = Math.min(100, (nutritionData.calories.value / nutritionData.calories.goal) * 100);


  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Calories</CardTitle>
        <CardDescription>Today's consumption</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
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
              polarRadius={[100, 100]}
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
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
             <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-5xl font-bold font-headline"
            >
                {Math.round(percentage)}%
            </text>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                dy="2.5rem"
                className="fill-muted-foreground text-lg"
            >
                {nutritionData.calories.value} / {nutritionData.calories.goal}
            </text>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CalorieGoalChart;
