'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

  return (
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
};

export default CalorieGoalChart;
