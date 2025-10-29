'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Camera, Wand2, ChefHat } from 'lucide-react';
import { generateRecipeFromIngredients, GenerateRecipeFromIngredientsOutput } from '@/ai/flows/generate-recipe-from-ingredients';
import Link from 'next/link';
import { useRecipeStore } from '@/store/recipe-store';
import { Recipe } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';

export default function PantryPalPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const addPantryRecipes = useRecipeStore((state) => state.addPantryRecipes);
  const [ingredients, setIngredients] = useState('');

  const handleGenerateRecipes = async () => {
    if (!ingredients.trim()) {
      toast({
        variant: 'destructive',
        title: 'No Ingredients',
        description: 'Please enter the ingredients you have.',
      });
      return;
    }

    setLoading(true);
    setGeneratedRecipes([]);

    const ingredientsList = ingredients.split(',').map(item => item.trim());

    try {
      const result: GenerateRecipeFromIngredientsOutput = await generateRecipeFromIngredients({
        ingredients: ingredientsList,
      });

      const newRecipes = addPantryRecipes(result.recipes);
      setGeneratedRecipes(newRecipes);

    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Error Generating Recipes',
        description: 'Could not generate recipes from your pantry. Please try again.',
      });
    }

    setLoading(false);
  };
  
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Pantry Pal
          </h1>
          <p className="text-muted-foreground">
            Enter your ingredients and get instant recipe ideas from AI.
          </p>
        </div>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle>What's in Your Pantry?</CardTitle>
            <CardDescription>Enter the ingredients you have available, separated by commas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g., chicken breast, broccoli, quinoa, olive oil, garlic"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={4}
              disabled={loading}
            />
            <Button onClick={handleGenerateRecipes} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Recipes
            </Button>
          </CardContent>
        </Card>

      {loading && (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {generatedRecipes.length > 0 && (
         <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-headline">Recipes from Your Pantry</h2>
                <Button variant="outline" onClick={() => { setGeneratedRecipes([]); setIngredients(''); }}>Start Over</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {generatedRecipes.map((recipe) => (
                <Card key={recipe.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{recipe.recipeName}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {recipe.reasoning}
                        </p>
                    </CardContent>
                    <CardFooter>
                       <Link href={`/recipes/${recipe.id}`} className="w-full">
                            <Button className="w-full">View Recipe</Button>
                        </Link>
                    </CardFooter>
                </Card>
                ))}
            </div>
         </div>
      )}
    </div>
  );
}
