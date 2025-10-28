'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { suggestRecipesBasedOnGoals } from '@/ai/flows/suggest-recipes-based-on-goals';
import type { RecipeSuggestion } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function RecipeCard({ recipe, index }: { recipe: RecipeSuggestion; index: number }) {
  const placeholder = PlaceHolderImages[index % PlaceHolderImages.length];

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="relative w-full h-40">
          <Image
            src={placeholder.imageUrl}
            alt={recipe.recipeName}
            fill
            className="object-cover rounded-md"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
        <CardTitle className="pt-4 font-headline">{recipe.recipeName}</CardTitle>
        <CardDescription className="text-xs">
          Suitability Score: {recipe.suitabilityScore}/100
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {recipe.reasoning}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/recipes/${index + 1}`} passHref className="w-full">
          <Button className="w-full">View Recipe</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function RecipesPage() {
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock data for the AI flow
      const input = {
        loggedMeals: JSON.stringify({
          breakfast: 'Oatmeal with berries',
          lunch: 'Chicken salad',
          dinner: 'Salmon with quinoa',
        }),
        nutritionalGoals: JSON.stringify({
          calories: 2000,
          protein: '150g',
          carbohydrates: '200g',
          fat: '70g',
          focus: 'muscle gain',
        }),
        userPreferences: JSON.stringify({
          likes: ['spicy food', 'Mediterranean cuisine'],
          dislikes: ['pork', 'excessively oily food'],
          dietary_restrictions: ['gluten-free'],
        }),
      };
      const result = await suggestRecipesBasedOnGoals(input);
      setSuggestions(result.suggestedRecipes);
    } catch (e) {
      setError('Failed to generate recipe suggestions. Please try again.');
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Recipe Suggestions
          </h1>
          <p className="text-muted-foreground">
            Let AI find the perfect recipes for your goals.
          </p>
        </div>
        <Button onClick={handleSuggestRecipes} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Suggest New Recipes'
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {suggestions.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} index={index} />
          ))}
        </div>
      )}

      {!loading && suggestions.length === 0 && !error && (
         <div className="flex items-center justify-center h-96">
            <div className="text-center">
                <p className="text-lg font-semibold">Ready for some inspiration?</p>
                <p className="text-muted-foreground">Click "Suggest New Recipes" to get started.</p>
            </div>
         </div>
      )}

    </div>
  );
}
