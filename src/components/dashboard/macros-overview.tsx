'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Drumstick, Wheat, Zap } from 'lucide-react';

type MacrosOverviewProps = {
    nutritionData: {
      macros: {
        protein: { value: number; goal: number };
        carbs: { value: number; goal: number };
        fat: { value: number; goal: number };
      };
    };
  };

const MacroCard = ({
  title,
  value,
  goal,
  unit,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  goal: number;
  unit: string;
  icon: React.ElementType;
  color: string;
}) => (
    <Card className="flex-1">
        <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" style={{ color }} />
                <CardTitle className="text-base font-medium">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">
                {value}
                <span className="text-base text-muted-foreground">/{goal}{unit}</span>
            </p>
            <Progress value={(value / goal) * 100} className="mt-2 h-2" style={{ '--tw-bg-primary': color } as React.CSSProperties} />
        </CardContent>
    </Card>
);

const MacrosOverview: React.FC<MacrosOverviewProps> = ({ nutritionData }) => (
    <div className="h-full flex flex-col gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Macronutrients</CardTitle>
                <CardDescription>Your macronutrient breakdown for today.</CardDescription>
            </CardHeader>
        </Card>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MacroCard
                title="Protein"
                value={nutritionData.macros.protein.value}
                goal={nutritionData.macros.protein.goal}
                unit="g"
                icon={Drumstick}
                color="hsl(var(--primary))"
            />
            <MacroCard
                title="Carbs"
                value={nutritionData.macros.carbs.value}
                goal={nutritionData.macros.carbs.goal}
                unit="g"
                icon={Wheat}
                color="hsl(var(--accent))"
            />
            <MacroCard
                title="Fat"
                value={nutritionData.macros.fat.value}
                goal={nutritionData.macros.fat.goal}
                unit="g"
                icon={Zap}
                color="#f59e0b" // Example: a gold/yellow color
            />
        </div>
    </div>
);

export default MacrosOverview;
