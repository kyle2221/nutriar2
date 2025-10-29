'use client';

import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ProgressChartProps = {
  data: { date: string; calories: number }[];
};

const chartConfig = {
  calories: {
    label: 'Calories',
    color: '#f59e0b', // Light orange
  },
} satisfies ChartConfig;

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: -20,
          right: 12,
          top: 12,
          bottom: 12
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={4}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <defs>
          <linearGradient id="fillCalories" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-calories)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-calories)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="calories"
          type="natural"
          fill="url(#fillCalories)"
          stroke="var(--color-calories)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ProgressChart;
