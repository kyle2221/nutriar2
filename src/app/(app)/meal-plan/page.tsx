'use client';
import { useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfToday,
  isSameDay,
  add,
} from 'date-fns';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRecipeStore } from '@/store/recipe-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function MealPlanPage() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = new Date(
    currentMonth.split('-')[1],
    new Date(Date.parse(currentMonth.split('-')[0] + ' 1, 2021')).getMonth(),
    1
  );

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const { recipes } = useRecipeStore();
  const favoritedRecipes = recipes.filter((r) => r.isFavorited);

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Interactive Meal Plan
      </h1>
      <div className="md:grid md:grid-cols-3 md:divide-x md:divide-border">
        <div className="md:pr-8">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-foreground">
              {format(firstDayCurrentMonth, 'MMMM yyyy')}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Next month</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-muted-foreground">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={cn(
                  dayIdx === 0 && `col-start-${(day.getDay() + 7) % 7 + 1}`,
                  'py-1.5'
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    isSameDay(day, selectedDay) && 'text-foreground',
                    !isSameDay(day, selectedDay) &&
                      isSameDay(day, today) &&
                      'text-primary',
                    !isSameDay(day, selectedDay) &&
                      !isSameDay(day, today) &&
                      'text-muted-foreground',
                    isSameDay(day, selectedDay) &&
                      isSameDay(day, today) &&
                      'bg-primary text-primary-foreground',
                    isSameDay(day, selectedDay) &&
                      !isSameDay(day, today) &&
                      'bg-accent text-accent-foreground',
                    !isSameDay(day, selectedDay) && 'hover:bg-accent',
                    (isSameDay(day, selectedDay) || isSameDay(day, today)) &&
                      'font-semibold'
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </div>
        <section className="mt-12 md:mt-0 md:pl-8">
          <h2 className="font-semibold text-foreground">
            Schedule for{' '}
            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
              {format(selectedDay, 'MMMM dd, yyyy')}
            </time>
          </h2>
          <ol className="mt-4 space-y-1 text-sm leading-6 text-muted-foreground">
            <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-accent hover:bg-accent">
              <div className="flex-auto">
                <p className="text-foreground">Avocado & Egg Power Toast</p>
                <p>
                  <time dateTime="2022-01-22T08:00">8:00 AM</time> (Breakfast)
                </p>
              </div>
            </li>
            <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-accent hover:bg-accent">
              <div className="flex-auto">
                <p className="text-foreground">
                  Mediterranean Athlete's Quinoa Bowl
                </p>
                <p>
                  <time dateTime="2022-01-22T13:00">1:00 PM</time> (Lunch)
                </p>
              </div>
            </li>
            <li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-accent hover:bg-accent">
              <div className="flex-auto">
                <p className="text-foreground">
                  Omega-3 Rich Salmon & Asparagus
                </p>
                <p>
                  <time dateTime-="2022-01-22T19:00">7:00 PM</time> (Dinner)
                </p>
              </div>
            </li>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full mt-4">
                  <PlusCircle className="mr-2" />
                  Add Meal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a Meal to Your Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <h3 className="font-semibold">Your Favorite Recipes</h3>
                  {favoritedRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {favoritedRecipes.map((recipe) => {
                        const image =
                          PlaceHolderImages.find(
                            (p) => p.imageHint === recipe.imageHint
                          ) || PlaceHolderImages[0];
                        return (
                          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
                            <div className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary">
                              <Image
                                src={image.imageUrl}
                                alt={recipe.recipeName}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover"
                              />
                              <div className="p-4">
                                <h4 className="font-semibold truncate">
                                  {recipe.recipeName}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {recipe.calories} kcal
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      You haven't favorited any recipes yet.
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </ol>
        </section>
      </div>
    </div>
  );
}
