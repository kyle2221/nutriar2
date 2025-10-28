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
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type MealLogProps = {
    meals: Meal[];
};

const getMealImage = (mealName: string) => {
    const nameLower = mealName.toLowerCase();
    // Try to find a specific hint first
    let hint = nameLower.split(' ')[0];
    let image = PlaceHolderImages.find(p => p.imageHint.includes(hint));
    if (image) return image;

    // Fallback logic
    if (nameLower.includes('salad')) return PlaceHolderImages.find(p => p.id === 'salad-1');
    if (nameLower.includes('chicken')) return PlaceHolderImages.find(p => p.id === 'chicken-1');
    if (nameLower.includes('oatmeal')) return PlaceHolderImages.find(p => p.id === 'oatmeal-1');
    if (nameLower.includes('pancake')) return PlaceHolderImages.find(p => p.id === 'pancakes-1');
    if (nameLower.includes('smoothie')) return PlaceHolderImages.find(p => p.id === 'smoothie-1');

    // Default fallback
    return PlaceHolderImages.find(p => p.id === 'generated-1');
}

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
            <TableHead className="w-[100px]">Image</TableHead>
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
            meals.map((meal) => {
                const image = getMealImage(meal.name);
                return (
              <TableRow key={meal.id}>
                 <TableCell>
                    {image && (
                        <Image 
                            src={image.imageUrl}
                            alt={meal.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover h-16 w-16"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                 </TableCell>
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
            )})
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
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
