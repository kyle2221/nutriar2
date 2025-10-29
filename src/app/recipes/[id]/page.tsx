'use client';

import Image from 'next/image';
import { ArCookingView } from '@/components/ar-cooking-view';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, AlertTriangle, Heart, Zap, Drumstick, Wheat, BrainCircuit, Star, ShieldCheck } from 'lucide-react';
import { useRecipeStore } from '@/store/recipe-store';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import type { Review } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

function NutritionStat({ icon: Icon, label, value, unit }: { icon: React.ElementType, label: string, value?: number, unit: string }) {
    if (value === undefined) return null;
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
        <Icon className="h-6 w-6 text-primary" />
        <div>
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-lg font-bold">{value}<span className="text-sm font-normal text-muted-foreground">{unit}</span></p>
        </div>
      </div>
    );
}

function StarRating({ rating, className, showValue = false }: { rating: number; className?: string, showValue?: boolean }) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={cn(
                "h-5 w-5",
                i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/50"
                )}
            />
            ))}
        </div>
        {showValue && <span className="text-sm font-medium text-muted-foreground">({rating.toFixed(1)})</span>}
      </div>
    );
}

function RecipeReviews({ reviews }: { reviews?: Review[] }) {
    if (!reviews || reviews.length === 0) {
      return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No reviews yet for this recipe.</p>
            </CardContent>
        </Card>
      );
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Reviews</CardTitle>
          <CardDescription>See what others are saying about this recipe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.avatarUrl} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.author}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
}

export default function SingleRecipePage({ params }: { params: { id: string } }) {
  const { getRecipeById, toggleFavorite } = useRecipeStore((state) => ({
    getRecipeById: state.getRecipeById,
    toggleFavorite: state.toggleFavorite,
  }));
  const { toast } = useToast();

  const recipe = useMemo(() => getRecipeById(params.id), [params.id, getRecipeById]);

  const placeholderImage = useMemo(() => {
    return PlaceHolderImages.find(p => p.imageHint === recipe?.imageHint) || PlaceHolderImages.find(p => p.imageHint.includes('ai')) || PlaceHolderImages[0];
  }, [recipe]);

  const handleToggleFavorite = () => {
    if (recipe) {
      toggleFavorite(recipe.id);
      toast({
        title: recipe.isFavorited ? 'Removed from Favorites' : 'Added to Favorites',
        description: `${recipe.recipeName} has been ${recipe.isFavorited ? 'removed from' : 'added to'} your favorites.`,
      });
    }
  };

  if (!recipe) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight font-headline">
            Recipe Not Found
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Sorry, we couldn't find the recipe you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <Card>
        <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2">
                <Image
                    src={placeholderImage.imageUrl}
                    alt={recipe.recipeName}
                    width={600}
                    height={400}
                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover w-full h-full"
                    data-ai-hint={placeholderImage.imageHint}
                />
            </div>

            <div className="md:col-span-3 flex flex-col">
                <CardHeader className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-4xl font-bold font-headline">
                        {recipe.recipeName}
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={handleToggleFavorite}>
                        <Heart className={recipe.isFavorited ? "text-red-500 fill-current" : "text-muted-foreground"} />
                        <span className="sr-only">Favorite</span>
                        </Button>
                    </div>
                     <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary" className="capitalize w-fit">{recipe.category}</Badge>
                        <StarRating rating={recipe.rating} showValue={true} />
                     </div>
                    <CardDescription className="text-lg">{recipe.reasoning}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="p-6 grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary-foreground">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <div>
                        <p className="font-semibold text-sm text-primary">Health Score</p>
                        <p className="text-lg font-bold text-primary">{recipe.healthScore}<span className="text-sm font-normal text-primary/80">/10</span></p>
                        </div>
                    </div>
                    <NutritionStat icon={Zap} label="Calories" value={recipe.calories} unit=" kcal" />
                    <NutritionStat icon={Drumstick} label="Protein" value={recipe.protein} unit="g" />
                    <NutritionStat icon={Wheat} label="Carbs" value={recipe.carbs} unit="g" />
                    <NutritionStat icon={BrainCircuit} label="Fat" value={recipe.fat} unit="g" />
                </CardContent>
            </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
            <CardHeader>
                <h3 className="font-semibold text-xl font-headline">Ingredients</h3>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4 text-base">
                    {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>{ing}</span>
                    </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <Card className="md:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-xl font-headline">Instructions</h3>
                    <span className="text-sm font-medium text-muted-foreground">
                        {recipe.instructions.length} Steps
                    </span>
                </div>
            </CardHeader>
            <CardContent>
            <div className="space-y-8">
                {recipe.instructions.map((step, i) => (
                <div key={i} className="flex items-start gap-6">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {i + 1}
                    </div>
                    <p className="flex-1 pt-1.5 text-base leading-relaxed">{step}</p>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
      </div>

      <RecipeReviews reviews={recipe.reviews} />

      <ArCookingView recipe={recipe} />
    </div>
  );
}
