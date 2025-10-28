import { CalendarCheck } from 'lucide-react';

export default function MealPlanPage() {
  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="text-center">
        <CalendarCheck className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight font-headline">
          Interactive Meal Planning
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          This feature is coming soon! Plan your meals and integrate them with AR cooking sessions.
        </p>
      </div>
    </div>
  );
}
