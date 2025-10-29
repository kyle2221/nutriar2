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
    color: 'hsl(var(--primary))',
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
          tickFormatter={(value, index) => {
            // Show fewer ticks for larger data sets to prevent clutter
            if (data.length > 30 && index % Math.floor(data.length / 10) !== 0) {
              return '';
            }
            if (data.length > 7 && value.includes('/')) {
              return value.split('/')[0] + '/' + value.split('/')[1]; // Format to M/D
            }
            return value;
          }}
          interval={data.length > 30 ? 'preserveStartEnd' : 0}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={4}
          domain={['dataMin - 100', 'dataMax + 100']}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <defs>
          <linearGradient id="fillCalories" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="calories"
          type="natural"
          fill="url(#fillCalories)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ProgressChart;
