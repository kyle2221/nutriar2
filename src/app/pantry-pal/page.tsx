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

export default function PantryPalPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const addPantryRecipes = useRecipeStore((state) => state.addPantryRecipes);

  useEffect(() => {
    if (isCameraOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      };

      getCameraPermission();
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isCameraOpen, toast]);

  const handleScanPantry = async () => {
    if (!videoRef.current) return;
    setLoading(true);
    
    // In a real app, an AI model would detect ingredients from the camera stream.
    // For this demo, we'll use a mock list of ingredients.
    const detectedIngredients = ['quinoa', 'chickpeas', 'avocado', 'tomatoes', 'red onion', 'garlic', 'olive oil'];

    try {
      const result: GenerateRecipeFromIngredientsOutput = await generateRecipeFromIngredients({
        ingredients: detectedIngredients,
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
    setIsCameraOpen(false);
  };
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Pantry Pal
          </h1>
          <p className="text-muted-foreground">
            Scan your pantry and get instant recipe ideas from AI.
          </p>
        </div>
      </div>
      
      {!isCameraOpen && generatedRecipes.length === 0 && (
        <Card className="text-center p-8 border-2 border-dashed rounded-lg">
          <CardHeader>
            <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle>Ready to cook something new?</CardTitle>
            <CardDescription>
              Use your camera to scan the ingredients in your pantry or fridge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsCameraOpen(true)}>
              <Camera className="mr-2 h-4 w-4" />
              Scan My Pantry
            </Button>
          </CardContent>
        </Card>
      )}

      {isCameraOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Your Pantry</CardTitle>
            <CardDescription>Point your camera at your ingredients. (This is a demo, it will use pre-defined ingredients)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {hasCameraPermission === false && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Alert variant="destructive" className="w-auto">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                      Please allow camera access to use this feature.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <Button onClick={handleScanPantry} disabled={loading || !hasCameraPermission}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Recipes
              </Button>
              <Button variant="outline" onClick={() => setIsCameraOpen(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedRecipes.length > 0 && (
         <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-headline">Recipes from Your Pantry</h2>
                <Button variant="outline" onClick={() => { setGeneratedRecipes([]); setIsCameraOpen(true); }}>Scan Again</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {generatedRecipes.map((recipe) => (
                <Card key={recipe.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{recipe.recipeName}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {recipe.reasoning}
                        </p>
                    </CardContent>
                    <CardFooter>
                       <Link href={`/recipes/${recipe.id}`} passHref className="w-full">
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
