
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
import { Loader2, Wand2, RefreshCw } from 'lucide-react';
import { identifyIngredientsFromImage } from '@/ai/flows/identify-ingredients-from-image';
import { generateRecipeFromIngredients, GenerateRecipeFromIngredientsOutput } from '@/ai/flows/generate-recipe-from-ingredients';
import Link from 'next/link';
import { useRecipeStore } from '@/store/recipe-store';
import { Recipe } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PantryPalState = 'camera' | 'review' | 'recipes';

export default function PantryPalPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [identifiedIngredients, setIdentifiedIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState<PantryPalState>('camera');
  const [craving, setCraving] = useState('');
  const [isClient, setIsClient] = useState(false);

  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const addPantryRecipes = useRecipeStore((state) => state.addPantryRecipes);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (pageState === 'camera' && isClient) {
        const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('Camera API is not available in this browser.');
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Not Supported',
                description: 'Your browser does not support camera access.',
            });
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
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
    }
    
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState, isClient]);
  
  const handleIdentifyIngredients = async (imageDataUri: string) => {
    setLoading(true);
    setIsScanning(false);
    try {
      const result = await identifyIngredientsFromImage({ imageDataUri });
      if (result.ingredients && result.ingredients.length > 0) {
        setIdentifiedIngredients(result.ingredients);
        setPageState('review');
      } else {
        toast({
          variant: 'destructive',
          title: 'No Ingredients Found',
          description: 'The AI could not identify any ingredients. Please try again.',
        });
        setIsScanning(true); // Restart scan
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Error Identifying Ingredients',
        description: 'Could not identify ingredients. Please try again.',
      });
       setIsScanning(true); // Restart scan
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
      const ingredientsWithCraving = craving 
        ? [...identifiedIngredients, `user is craving ${craving}`]
        : identifiedIngredients;

      const result: GenerateRecipeFromIngredientsOutput = await generateRecipeFromIngredients({
        ingredients: ingredientsWithCraving,
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

  const startScan = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsScanning(true);
    
    setTimeout(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageDataUri = canvas.toDataURL('image/jpeg');
        
        handleIdentifyIngredients(imageDataUri);
    }, 1500); 
  };


  const handleStartOver = () => {
    setPageState('camera');
    setIdentifiedIngredients([]);
    setGeneratedRecipes([]);
    setLoading(false);
    setIsScanning(false);
    setCraving('');
  };
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Pantry Pal
          </h1>
          <p className="text-muted-foreground">
            {
              pageState === 'camera' && 'Scan your pantry with AI to get recipe ideas.'
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

                <div className="absolute inset-0 flex items-center justify-center">
                    {loading && (
                        <div className="flex flex-col items-center gap-4 text-white">
                            <Loader2 className="h-12 w-12 animate-spin" />
                            <p className="text-lg font-semibold">
                                Analyzing...
                            </p>
                        </div>
                    )}
                </div>

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
                
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </CardContent>
          <CardFooter>
            <Button onClick={startScan} disabled={loading || !hasCameraPermission}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Scan Pantry
            </Button>
          </CardFooter>
        </Card>
      )}

      {pageState === 'review' && (
        <Card>
            <CardHeader>
                <CardTitle>Review Your Ingredients</CardTitle>
                <CardDescription>We found these items. Feel free to add or remove any before we generate recipes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex flex-wrap gap-2">
                 {identifiedIngredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-base py-1 px-3">
                      {ingredient}
                    </Badge>
                  ))}
               </div>
               <div>
                  <Label htmlFor="craving" className="text-base font-medium">In the mood for anything specific?</Label>
                  <Input 
                    id="craving"
                    placeholder="e.g., something spicy, a quick salad, pasta..."
                    value={craving}
                    onChange={(e) => setCraving(e.target.value)}
                    className="mt-2"
                  />
               </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleGenerateRecipes} disabled={loading} size="lg">
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
