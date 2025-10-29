'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Leaf,
  Apple,
  Mail,
  MoveLeft,
  MoveRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { providePersonalizedPlan } from '@/ai/flows/provide-personalized-plan';
import { useRouter } from 'next/navigation';

type Step =
  | 'welcome'
  | 'gender'
  | 'measurements'
  | 'goals'
  | 'activity'
  | 'diet'
  | 'loading'
  | 'result'
  | 'signup';

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center gap-2">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`h-2 w-2 rounded-full ${
          i < currentStep ? 'bg-primary' : 'bg-muted'
        }`}
      />
    ))}
  </div>
);

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState({
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    dietaryPreferences: '',
  });
  const [plan, setPlan] = useState('');

  const stepNumber = useMemo(() => {
    const order: Step[] = [
      'welcome',
      'gender',
      'measurements',
      'goals',
      'activity',
      'diet',
    ];
    const index = order.indexOf(step);
    return index >= 0 ? index : 0;
  }, [step]);

  const progress = useMemo(() => {
    return (stepNumber / 5) * 100;
  }, [stepNumber]);

  const handleNext = () => {
    const steps: Step[] = [
      'welcome',
      'gender',
      'measurements',
      'goals',
      'activity',
      'diet',
      'loading',
    ];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = [
      'diet',
      'activity',
      'goals',
      'measurements',
      'gender',
      'welcome',
    ];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const generatePlan = async () => {
    setStep('loading');
    try {
      const result = await providePersonalizedPlan(formData);
      setPlan(result.plan);
      setStep('result');
    } catch (e) {
      console.error(e);
      // Fallback to the diet step on error
      setStep('diet');
    }
  };
  
  const handleSignUp = () => {
    // In a real app, this would handle the sign-up logic.
    // For now, it will just redirect to the dashboard.
    router.push('/dashboard');
  }

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tighter font-headline sm:text-5xl md:text-6xl">
              Welcome to NutriAR
            </h1>
            <p className="max-w-xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
              Let's create your personalized health plan. It only takes a
              minute.
            </p>
            <Button size="lg" onClick={handleNext} className="mt-8">
              Get Started <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        );
      case 'gender':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>What is your biological sex?</CardTitle>
              <CardDescription>
                This helps us calculate your baseline metabolic rate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => {
                  setFormData({ ...formData, gender: value });
                  setTimeout(handleNext, 200);
                }}
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="male"
                  className="flex flex-col items-center justify-center gap-4 rounded-md border-2 p-4 hover:border-primary cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="male" id="male" className="sr-only" />
                  <span className="text-4xl">👨</span>
                  Male
                </Label>
                <Label
                  htmlFor="female"
                  className="flex flex-col items-center justify-center gap-4 rounded-md border-2 p-4 hover:border-primary cursor-pointer [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem
                    value="female"
                    id="female"
                    className="sr-only"
                  />
                   <span className="text-4xl">👩</span>
                  Female
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
        );
      case 'measurements':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Your Measurements</CardTitle>
              <CardDescription>
                Help us understand your body composition.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 180"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 75"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      case 'goals':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>What's your primary goal?</CardTitle>
              <CardDescription>
                Select the one that matters most to you right now.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.goal}
                onValueChange={(value) => {
                  setFormData({ ...formData, goal: value });
                   setTimeout(handleNext, 200);
                }}
                className="grid grid-cols-1 gap-4"
              >
                {[
                  'Lose Weight',
                  'Build Muscle',
                  'Maintain Weight',
                  'Improve Health',
                ].map((goal) => (
                  <Label
                    key={goal}
                    htmlFor={goal}
                    className="flex items-center gap-4 rounded-md border-2 p-4 hover:border-primary cursor-pointer [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value={goal} id={goal} />
                    {goal}
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        );
      case 'activity':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>How active are you?</CardTitle>
              <CardDescription>
                Be honest! This helps estimate your daily calorie needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.activityLevel}
                onValueChange={(value) =>
                  setFormData({ ...formData, activityLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">
                    Sedentary (little or no exercise)
                  </SelectItem>
                  <SelectItem value="lightly_active">
                    Lightly Active (light exercise/sports 1-3 days/week)
                  </SelectItem>
                  <SelectItem value="moderately_active">
                    Moderately Active (moderate exercise/sports 3-5 days/week)
                  </SelectItem>
                  <SelectItem value="very_active">
                    Very Active (hard exercise/sports 6-7 days a week)
                  </SelectItem>
                  <SelectItem value="extra_active">
                    Extra Active (very hard exercise & physical job)
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        );
      case 'diet':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>
                Let us know about any foods you like, dislike, or can't eat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., I love spicy food, I'm vegetarian, allergic to nuts."
                value={formData.dietaryPreferences}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dietaryPreferences: e.target.value,
                  })
                }
                rows={4}
              />
            </CardContent>
          </Card>
        );
      case 'loading':
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-2xl font-semibold">
              Crafting your plan...
            </h2>
            <p className="text-muted-foreground">
              Our AI is analyzing your inputs to create a personalized plan just
              for you.
            </p>
          </div>
        );
      case 'result':
        return (
          <Card className="w-full max-w-lg animate-in fade-in-50">
            <CardHeader className="text-center">
              <Sparkles className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="text-2xl mt-4">Your Personalized Plan</CardTitle>
              <CardDescription>
                Based on your inputs, here is a starting point for your health
                journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert rounded-md border bg-muted/50 p-4 max-h-60 overflow-y-auto">
                 <pre className="text-sm whitespace-pre-wrap font-sans">{plan}</pre>
              </div>
            </CardContent>
          </Card>
        );
      case 'signup':
        return (
          <Card className="w-full max-w-sm text-center">
            <CardHeader>
              <CardTitle>You're all set!</CardTitle>
              <CardDescription>
                Create an account to save your plan and start your journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline" onClick={handleSignUp}>
                <GoogleIcon />
                <span className="ml-2">Sign up with Google</span>
              </Button>
              <Button className="w-full bg-black hover:bg-black/80 text-white" onClick={handleSignUp}>
                <Apple className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--primary-foreground))' }}/> Sign up with Apple
              </Button>
              <Button className="w-full" onClick={handleSignUp}>
                <Mail className="mr-2 h-5 w-5" /> Sign up with Email
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if(step === 'loading' && !plan) {
      generatePlan();
    }
  }, [step, plan]);

  const showNav = step !== 'welcome' && step !== 'loading' && step !== 'result' && step !== 'signup';
  const showProgress = step !== 'welcome' && step !== 'loading' && step !== 'result' && step !== 'signup';

  return (
    <div className="flex-1 w-full bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          opacity: 0.1,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 md:px-6">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">NutriAR</span>
        </div>

        <div className="flex flex-col items-center w-full min-h-[400px]">
          {renderStep()}
        </div>

        <div className="absolute bottom-6 w-full max-w-md px-4">
          {showProgress && <Progress value={progress} className="mb-4" />}
          {showNav && (
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleBack}>
                <MoveLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              <StepIndicator currentStep={stepNumber} />
              <Button
                onClick={
                  step === 'diet' ? generatePlan : handleNext
                }
              >
                {step === 'diet' ? 'Generate Plan' : 'Next'}
                <MoveRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
          {step === 'result' && (
             <div className="flex justify-center">
                <Button size="lg" onClick={() => setStep('signup')}>
                    Save Plan & Sign Up <MoveRight className="ml-2 h-5 w-5" />
                </Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
