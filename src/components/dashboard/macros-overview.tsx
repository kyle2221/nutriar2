'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
}: {
  title: string;
  value: number;
  goal: number;
  unit: string;
  icon: React.ElementType;
}) => (
  <Card className="flex items-center p-4">
    <div className='p-3 rounded-full mr-4 bg-primary text-primary-foreground'>
      <Icon className="h-6 w-6" />
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

const MacrosOverview: React.FC<MacrosOverviewProps> = ({ nutritionData }) => (
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
      />
      <MacroCard
        title="Carbohydrates"
        value={nutritionData.macros.carbs.value}
        goal={nutritionData.macros.carbs.goal}
        unit="g"
        icon={Wheat}
      />
      <MacroCard
        title="Fat"
        value={nutritionData.macros.fat.value}
        goal={nutritionData.macros.fat.goal}
        unit="g"
        icon={Zap}
      />
    </CardContent>
  </Card>
);

export default MacrosOverview;
