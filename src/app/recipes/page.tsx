'use client';

import { useState, useMemo } from 'react';
import { Loader2, Wand2, Heart, Star, ShieldCheck } from 'lucide-react';
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
import { suggestRecipesBasedOnGoals, SuggestRecipesOutput } from '@/ai/flows/suggest-recipes-based-on-goals';
import type { Recipe } from '@/lib/types';
import { useRecipeStore } from '@/store/recipe-store';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Favorites'] as const;
type Category = (typeof categories)[number];

function StarRating({ rating, className }: { rating: number; className?: string }) {
    return (
      <div className={cn("flex items-center gap-0.5", className)}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
    );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { toggleFavorite } = useRecipeStore();
  const placeholder = PlaceHolderImages.find(p => p.imageHint === recipe.imageHint) || PlaceHolderImages[0];

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Link href={`/recipes/${recipe.id}`} passHref>
              <Image
                src={placeholder.imageUrl}
                alt={recipe.recipeName}
                fill
                className="object-cover cursor-pointer"
                data-ai-hint={placeholder.imageHint}
              />
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-9 w-9 backdrop-blur-sm"
            onClick={() => toggleFavorite(recipe.id)}
          >
            <Heart className={recipe.isFavorited ? "text-red-500 fill-current" : "text-gray-500"} size={18} />
            <span className="sr-only">Favorite</span>
          </Button>
           <Badge variant="secondary" className="absolute bottom-3 left-3 capitalize">
            {recipe.category}
          </Badge>
        </div>
      </CardHeader>
      <div className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline mb-2">{recipe.recipeName}</CardTitle>
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
           <div className="flex items-center gap-1">
             <StarRating rating={recipe.rating} />
             <span>({recipe.rating})</span>
           </div>
           <div className="flex items-center gap-1">
             <ShieldCheck className="h-4 w-4 text-primary" />
             <span>Health: {recipe.healthScore}/10</span>
           </div>
        </div>
        <CardContent className="p-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {recipe.reasoning}
          </p>
        </CardContent>
        <CardFooter className="p-0 pt-6">
            <Link href={`/recipes/${recipe.id}`} passHref className="w-full">
            <Button className="w-full">View Recipe</Button>
            </Link>
        </CardFooter>
      </div>
    </Card>
  );
}

export default function RecipesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  
  const { recipes, addAiRecipes } = useRecipeStore();

  const filteredRecipes = useMemo(() => {
    if (activeFilter === 'All') return recipes;
    if (activeFilter === 'Favorites') return recipes.filter(r => r.isFavorited);
    return recipes.filter(recipe => recipe.category === activeFilter);
  }, [recipes, activeFilter]);

  const handleSuggestRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
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
      const result: SuggestRecipesOutput = await suggestRecipesBasedOnGoals(input);
      addAiRecipes(result.suggestedRecipes);
    } catch (e) {
      setError('Failed to generate recipe suggestions. Please try again.');
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Recipes
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover recipes tailored to your goals or browse our collection.
          </p>
        </div>
        <Button onClick={handleSuggestRecipes} disabled={loading} size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? 'default' : 'outline'}
            onClick={() => setActiveFilter(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <div className="text-center">
                <p className="text-lg font-semibold">No recipes found</p>
                <p className="text-muted-foreground mt-2">Try a different filter or generate new recipes with AI.</p>
            </div>
         </div>
      )}
    </div>
  );
}
