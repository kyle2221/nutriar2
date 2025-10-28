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
import { CheckCircle2, AlertTriangle, Heart } from 'lucide-react';
import { useRecipeStore } from '@/store/recipe-store';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

export default function SingleRecipePage({ params }: { params: { id: string } }) {
  const { getRecipeById, toggleFavorite } = useRecipeStore((state) => ({
    getRecipeById: state.getRecipeById,
    toggleFavorite: state.toggleFavorite,
  }));

  const recipe = useMemo(() => getRecipeById(params.id), [params.id, getRecipeById]);

  const placeholderImage = useMemo(() => {
    return PlaceHolderImages.find(p => p.imageHint === recipe?.imageHint) || PlaceHolderImages.find(p => p.imageHint.includes('ai')) || PlaceHolderImages[0];
  }, [recipe]);

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
        <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
                <Image
                    src={placeholderImage.imageUrl}
                    alt={recipe.recipeName}
                    width={600}
                    height={400}
                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover w-full h-full shadow-lg"
                    data-ai-hint={placeholderImage.imageHint}
                />
            </div>

            <div className="md:col-span-3 p-6">
                <CardHeader className="p-0">
                    <div className="flex justify-between items-start mb-4">
                        <CardTitle className="text-4xl font-bold font-headline">
                        {recipe.recipeName}
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(recipe.id)}>
                        <Heart className={recipe.isFavorited ? "text-red-500 fill-current" : "text-muted-foreground"} />
                        <span className="sr-only">Favorite</span>
                        </Button>
                    </div>
                    <CardDescription className="text-lg">{recipe.reasoning}</CardDescription>
                </CardHeader>
                <Separator className="my-6" />
                <CardContent className="p-0">
                    <h3 className="font-semibold text-xl font-headline mb-4">Ingredients</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                        {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            <span>{ing}</span>
                        </li>
                        ))}
                    </ul>
                </CardContent>
            </div>
        </div>
      </Card>
      
      <Card>
        <CardHeader>
            <h3 className="font-semibold text-xl font-headline">Instructions</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {i + 1}
                </div>
                <p className="flex-1 pt-1 text-base leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ArCookingView recipe={recipe} />
    </div>
  );
}
