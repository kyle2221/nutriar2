'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useMealStore } from '@/store/meal-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Camera, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { logMealFromImage } from '@/ai/flows/log-meal-from-image';

const LogMealCameraDialog = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const { addMeal } = useMealStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ name: string; calories: number; protein: number; carbs: number; fat: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state when dialog opens
      setCapturedImage(null);
      setAnalysisResult(null);
      
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
      // Cleanup: stop camera stream when dialog closes
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isOpen, toast]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imageDataUri = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataUri);
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    setLoading(true);
    try {
      const result = await logMealFromImage({ imageDataUri: capturedImage });
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze the meal from the image. Please try again.',
      });
    }
    setLoading(false);
  };

  const handleLogMeal = () => {
    if (!analysisResult) return;
    addMeal(analysisResult);
    toast({
      title: 'Meal Logged!',
      description: `${analysisResult.name} has been added to your log.`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Log Meal with Camera</DialogTitle>
          <DialogDescription>
            {analysisResult
              ? 'Review the analysis and log your meal.'
              : capturedImage
              ? 'Analyze the captured image to get nutritional info.'
              : 'Point your camera at your meal and capture a photo.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!capturedImage ? (
            <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
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
          ) : (
            <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
                <Image src={capturedImage} alt="Captured Meal" layout="fill" objectFit="cover" />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {analysisResult && (
            <div className="space-y-2 rounded-lg border p-4">
                <h3 className="font-semibold">{analysisResult.name}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <p>Calories: <span className="font-medium text-foreground">{analysisResult.calories} kcal</span></p>
                    <p>Protein: <span className="font-medium text-foreground">{analysisResult.protein}g</span></p>
                    <p>Carbs: <span className="font-medium text-foreground">{analysisResult.carbs}g</span></p>
                    <p>Fat: <span className="font-medium text-foreground">{analysisResult.fat}g</span></p>
                </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!capturedImage ? (
            <Button onClick={handleCapture} disabled={!hasCameraPermission}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
          ) : !analysisResult ? (
            <>
              <Button variant="outline" onClick={() => setCapturedImage(null)} disabled={loading}>
                Retake
              </Button>
              <Button onClick={handleAnalyze} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Analyze Meal
              </Button>
            </>
          ) : (
            <>
                <Button variant="outline" onClick={() => setAnalysisResult(null)} disabled={loading}>
                    Re-analyze
                </Button>
                <Button onClick={handleLogMeal} disabled={loading}>
                    Log Meal
                </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogMealCameraDialog;
