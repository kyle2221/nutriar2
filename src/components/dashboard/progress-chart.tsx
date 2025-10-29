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
  Dot,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Metric } from '@/app/dashboard/page';

type ProgressChartProps = {
  data: { date: string; [key: string]: any }[];
  metric: Metric;
};

const metricConfig: Record<Metric, { label: string; color: string; unit: string }> = {
    calories: { label: "Calories", color: "hsl(25, 95%, 53%)", unit: "kcal" },
    protein: { label: "Protein", color: "hsl(200 80% 50%)", unit: "g" },
    carbs: { label: "Carbs", color: "hsl(40 80% 50%)", unit: "g" },
    fat: { label: "Fat", color: "hsl(0 70% 50%)", unit: "g" },
    steps: { label: "Steps", color: "hsl(150 70% 40%)", unit: "" },
};

const ProgressChart: React.FC<ProgressChartProps> = ({ data, metric }) => {
  const config = metricConfig[metric];

  const chartConfig = {
    [metric]: {
      label: config.label,
      color: config.color,
    },
  } satisfies ChartConfig;

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
            if (data.length > 30 && index % Math.floor(data.length / 10) !== 0) {
              return '';
            }
            if (data.length > 7 && value.includes('/')) {
              return value.split('/')[0] + '/' + value.split('/')[1];
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
          domain={['dataMin - 10', 'dataMax + 10']}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent 
            indicator="line" 
            formatter={(value) => `${value}${config.unit}`}
          />}
        />
        <defs>
          <linearGradient id={`fill${metric}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-fill)"
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor="var(--color-fill)"
              stopOpacity={0.01}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey={metric}
          type="monotone"
          fill={`url(#fill${metric})`}
          stroke={`var(--color-${metric})`}
          strokeWidth={2}
          stackId="a"
          dot={(props) => {
            if (props.index === data.length - 1) {
              return <Dot {...props} r={4} fill={config.color} strokeWidth={2} />;
            }
            return null;
          }}
          activeDot={(props) => <Dot {...props} r={5} fill={config.color} strokeWidth={1} />}
          style={{
            '--color-fill': 'hsl(var(--muted))'
          } as React.CSSProperties}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ProgressChart;
