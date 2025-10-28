import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
  Beef,
  Wheat,
  Droplets,
  PlusCircle,
  MoreVertical,
} from 'lucide-react';
import type { Meal } from '@/lib/types';

const nutritionData = {
  calories: { value: 1250, goal: 2000, icon: Flame },
  protein: { value: 80, goal: 120, icon: Beef },
  carbs: { value: 150, goal: 250, icon: Wheat },
  fat: { value: 40, goal: 60, icon: Droplets },
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

const NutritionCard = ({
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
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        <span className="text-xs text-muted-foreground">/{goal}{unit}</span>
      </div>
      <Progress value={(value / goal) * 100} className="mt-2 h-2" />
    </CardContent>
  </Card>
);

const NutritionOverview = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <NutritionCard
      title="Calories"
      value={nutritionData.calories.value}
      goal={nutritionData.calories.goal}
      unit="kcal"
      icon={nutritionData.calories.icon}
    />
    <NutritionCard
      title="Protein"
      value={nutritionData.protein.value}
      goal={nutritionData.protein.goal}
      unit="g"
      icon={nutritionData.protein.icon}
    />
    <NutritionCard
      title="Carbohydrates"
      value={nutritionData.carbs.value}
      goal={nutritionData.carbs.goal}
      unit="g"
      icon={nutritionData.carbs.icon}
    />
    <NutritionCard
      title="Fat"
      value={nutritionData.fat.value}
      goal={nutritionData.fat.goal}
      unit="g"
      icon={nutritionData.fat.icon}
    />
  </div>
);

const MealLog = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Today's Meal Log</CardTitle>
          <CardDescription>
            A summary of your meals for today.
          </CardDescription>
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
      <div className="space-y-4">
        <NutritionOverview />
        <MealLog />
      </div>
    </div>
  );
}
