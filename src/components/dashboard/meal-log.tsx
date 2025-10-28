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
import { PlusCircle, MoreVertical } from 'lucide-react';
import type { Meal } from '@/lib/types';
import LogMealDialog from './log-meal-dialog';

type MealLogProps = {
    meals: Meal[];
};


const MealLog: React.FC<MealLogProps> = ({ meals }) => (
  <Card className="col-span-1 md:col-span-3">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Today's Meal Log</CardTitle>
          <CardDescription>A summary of your meals for today.</CardDescription>
        </div>
        <LogMealDialog>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Log Meal
            </Button>
        </LogMealDialog>
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

export default MealLog;
