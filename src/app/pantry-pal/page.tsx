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
import { Loader2, Camera, Wand2, ScanLine, RefreshCw } from 'lucide-react';
import { identifyIngredientsFromImage } from '@/ai/flows/identify-ingredients-from-image';
import { generateRecipeFromIngredients, GenerateRecipeFromIngredientsOutput } from '@/ai/flows/generate-recipe-from-ingredients';
import Link from 'next/link';
import { useRecipeStore } from '@/store/recipe-store';
import { Recipe } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type PantryPalState = 'camera' | 'review' | 'recipes';

export default function PantryPalPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [identifiedIngredients, setIdentifiedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState<PantryPalState>('camera');

  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const addPantryRecipes = useRecipeStore((state) => state.addPantryRecipes);

  useEffect(() => {
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
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imageDataUri = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataUri);
    handleIdentifyIngredients(imageDataUri);
  };
  
  const handleIdentifyIngredients = async (imageDataUri: string) => {
    setLoading(true);
    try {
      const result = await identifyIngredientsFromImage({ imageDataUri });
      if (result.ingredients && result.ingredients.length > 0) {
        setIdentifiedIngredients(result.ingredients);
        setPageState('review');
      } else {
        toast({
          variant: 'destructive',
          title: 'No Ingredients Found',
          description: 'The AI could not identify any ingredients. Please try again with a clearer picture.',
        });
        setCapturedImage(null);
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Error Identifying Ingredients',
        description: 'Could not identify ingredients from your pantry. Please try again.',
      });
      setCapturedImage(null);
    }
    setLoading(false);
  };


  const handleGenerateRecipes = async () => {
    if (identifiedIngredients.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Ingredients',
        description: 'No ingredients were identified to generate recipes from.',
      });
      return;
    }

    setLoading(true);
    setGeneratedRecipes([]);

    try {
      const result: GenerateRecipeFromIngredientsOutput = await generateRecipeFromIngredients({
        ingredients: identifiedIngredients,
      });

      const newRecipes = addPantryRecipes(result.recipes);
      setGeneratedRecipes(newRecipes);
      setPageState('recipes');

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

  const handleStartOver = () => {
    setPageState('camera');
    setCapturedImage(null);
    setIdentifiedIngredients([]);
    setGeneratedRecipes([]);
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
            {
              pageState === 'camera' && 'Scan your pantry with AI to get instant recipe ideas.'
            }
             {
              pageState === 'review' && 'Review the ingredients and generate recipes.'
            }
             {
              pageState === 'recipes' && 'Here are some recipe ideas based on your pantry!'
            }
          </p>
        </div>
         {pageState !== 'camera' && (
          <Button variant="outline" onClick={handleStartOver}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        )}
      </div>
      
      {pageState === 'camera' && (
         <Card>
          <CardContent className="p-6">
             <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                <div className="absolute inset-0 bg-black/20" />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Alert variant="destructive" className="w-auto">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                            Please allow camera access.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-12 w-12 animate-spin text-white" />
                    </div>
                )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </CardContent>
          <CardFooter className="flex justify-center">
             <Button size="lg" onClick={handleCapture} disabled={!hasCameraPermission || loading}>
              <ScanLine className="mr-2 h-5 w-5" /> Scan Pantry
            </Button>
          </CardFooter>
        </Card>
      )}

      {pageState === 'review' && (
        <Card>
            <CardHeader>
                <CardTitle>Identified Ingredients</CardTitle>
                <CardDescription>We found these ingredients. Remove any that are incorrect, then generate recipes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex flex-wrap gap-2">
                 {identifiedIngredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                      {ingredient}
                    </Badge>
                  ))}
               </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleGenerateRecipes} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate Recipes
                </Button>
            </CardFooter>
        </Card>
      )}

      {pageState === 'recipes' && (
         <div className="space-y-6">
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
