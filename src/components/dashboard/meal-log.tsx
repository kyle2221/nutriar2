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
import { MoreVertical, Camera } from 'lucide-react';
import type { Meal } from '@/lib/types';
import LogMealCameraDialog from './log-meal-camera-dialog';

type MealLogProps = {
    meals: Meal[];
};


const MealLog: React.FC<MealLogProps> = ({ meals }) => (
  <Card className="col-span-1 lg:col-span-3">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Today's Meal Log</CardTitle>
          <CardDescription>A summary of your meals for today.</CardDescription>
        </div>
        <div className="flex gap-2">
            <LogMealCameraDialog>
                <Button>
                    <Camera className="mr-2 h-4 w-4" /> Log with AI
                </Button>
            </LogMealCameraDialog>
        </div>
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
          {meals.length > 0 ? (
            meals.map((meal) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No meals logged yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default MealLog;
