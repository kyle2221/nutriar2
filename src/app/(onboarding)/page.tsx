
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
  User,
  HeartPulse,
  Dumbbell,
  Weight,
  Target,
  Bike,
  Zap,
  Wheat,
  Brain,
  Drumstick,
  Sofa,
  Footprints,
  PersonStanding,
  Flame,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { providePersonalizedPlan, PersonalizedPlanOutput } from '@/ai/flows/provide-personalized-plan';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

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

type Units = 'metric' | 'imperial';

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
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={cn('h-1.5 w-6 rounded-full transition-colors', 
          i < currentStep ? 'bg-primary' : 'bg-muted'
        )}
      />
    ))}
  </div>
);

const getMealImage = (mealName: string) => {
    const nameLower = mealName.toLowerCase();
    const hints = ['salad', 'chicken', 'oatmeal', 'pancake', 'smoothie', 'salmon', 'egg', 'toast', 'yogurt', 'fruit', 'soup', 'pasta', 'steak', 'burger', 'wrap', 'tuna', 'avocado'];
    
    for (const hint of hints) {
        if (nameLower.includes(hint)) {
            const image = PlaceHolderImages.find(p => p.imageHint.includes(hint));
            if (image) return image;
        }
    }
    return PlaceHolderImages.find(p => p.imageHint.includes('ai')) || PlaceHolderImages[0];
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background/90 p-2 text-sm shadow-md">
          <p className="font-bold">{`${payload[0].name}: ${payload[0].value}g`}</p>
        </div>
      );
    }
    return null;
  };

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('welcome');
  const [units, setUnits] = useState<Units>('metric');
  const [formData, setFormData] = useState({
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    dietaryPreferences: '',
  });
  const [imperialData, setImperialData] = useState({
    height_ft: '',
    height_in: '',
    weight_lbs: '',
  });
  const [plan, setPlan] = useState<PersonalizedPlanOutput | null>(null);

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
    let finalData = { ...formData };
    if (units === 'imperial') {
        const feet = parseFloat(imperialData.height_ft) || 0;
        const inches = parseFloat(imperialData.height_in) || 0;
        const totalInches = feet * 12 + inches;
        const cm = totalInches * 2.54;

        const lbs = parseFloat(imperialData.weight_lbs) || 0;
        const kg = lbs * 0.453592;

        finalData.height = cm > 0 ? String(Math.round(cm)) : '';
        finalData.weight = kg > 0 ? String(Math.round(kg)) : '';
    }
    
    setStep('loading');
    try {
      const result = await providePersonalizedPlan(finalData);
      setPlan(result);
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

  const isNextDisabled = () => {
    switch (step) {
      case 'gender':
          return !formData.gender;
      case 'measurements':
        if (units === 'metric') {
          return !formData.height || !formData.weight;
        } else {
          return !imperialData.height_ft || !imperialData.weight_lbs;
        }
      case 'goals':
          return !formData.goal;
      case 'activity':
        return !formData.activityLevel;
      case 'diet':
        return !formData.dietaryPreferences;
      default:
        return false;
    }
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
              Let's build your personalized health plan. It only takes a minute. Ready to start your journey?
            </p>
            <Button size="lg" onClick={handleNext} className="mt-8 shadow-md">
              Get Started <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        );
      case 'gender':
        return (
          <Card className="w-full max-w-lg shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">What is your biological sex?</CardTitle>
              <CardDescription>
                This helps us calculate your baseline metabolic rate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.gender.startsWith('other:') ? 'other' : formData.gender}
                onValueChange={(value) => {
                  if (value !== 'other') {
                    setFormData({ ...formData, gender: value });
                    setTimeout(handleNext, 200);
                  } else {
                     setFormData({ ...formData, gender: 'other:' });
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <Label
                  htmlFor="male"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border-2 p-6 hover:border-primary cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:shadow-md"
                >
                  <RadioGroupItem value="male" id="male" className="sr-only" />
                  <User className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="font-semibold text-lg">Male</span>
                </Label>
                <Label
                  htmlFor="female"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border-2 p-6 hover:border-primary cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:shadow-md"
                >
                  <RadioGroupItem
                    value="female"
                    id="female"
                    className="sr-only"
                  />
                  <User className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="font-semibold text-lg">Female</span>
                </Label>
                <Label
                  htmlFor="other"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border-2 p-6 hover:border-primary cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:shadow-md"
                >
                  <RadioGroupItem value="other" id="other" className="sr-only" />
                  <Sparkles className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="font-semibold text-lg">Other</span>
                </Label>
              </RadioGroup>
              {formData.gender.startsWith('other:') && (
                <div className="mt-4 space-y-2 animate-in fade-in-0 duration-500">
                  <Label htmlFor="other_gender">Please specify</Label>
                  <Input
                    id="other_gender"
                    placeholder="Your identity"
                    value={formData.gender.substring(6)}
                    onChange={(e) => setFormData({...formData, gender: `other:${e.target.value}`})}
                    autoFocus
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );
      case 'measurements':
        return (
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">Your Measurements</CardTitle>
              <CardDescription>
                Help us understand your body composition.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-center space-x-2">
                    <Label htmlFor="units-switch" className={cn(units === 'imperial' && 'text-muted-foreground')}>Imperial</Label>
                    <Switch
                        id="units-switch"
                        checked={units === 'metric'}
                        onCheckedChange={(checked) => setUnits(checked ? 'metric' : 'imperial')}
                    />
                    <Label htmlFor="units-switch" className={cn(units === 'metric' && 'text-muted-foreground')}>Metric</Label>
                </div>
              
                {units === 'metric' ? (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="height" className="font-semibold flex items-center gap-2">
                                <HeartPulse className="h-4 w-4" /> Height (cm)
                            </Label>
                            <Input
                            id="height"
                            type="number"
                            placeholder="e.g., 180"
                            value={formData.height}
                            onChange={(e) =>
                                setFormData({ ...formData, height: e.target.value })
                            }
                            className="text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="font-semibold flex items-center gap-2">
                                <Weight className="h-4 w-4" /> Weight (kg)
                            </Label>
                            <Input
                            id="weight"
                            type="number"
                            placeholder="e.g., 75"
                            value={formData.weight}
                            onChange={(e) =>
                                setFormData({ ...formData, weight: e.target.value })
                            }
                            className="text-lg"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="height_ft" className="font-semibold flex items-center gap-2">
                                <HeartPulse className="h-4 w-4" /> Height
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    id="height_ft"
                                    type="number"
                                    placeholder="ft"
                                    value={imperialData.height_ft}
                                    onChange={(e) => setImperialData({ ...imperialData, height_ft: e.target.value })}
                                    className="text-lg"
                                />
                                <Input
                                    id="height_in"
                                    type="number"
                                    placeholder="in"
                                    value={imperialData.height_in}
                                    onChange={(e) => setImperialData({ ...imperialData, height_in: e.target.value })}
                                    className="text-lg"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight_lbs" className="font-semibold flex items-center gap-2">
                                <Weight className="h-4 w-4" /> Weight (lbs)
                            </Label>
                            <Input
                                id="weight_lbs"
                                type="number"
                                placeholder="e.g., 165"
                                value={imperialData.weight_lbs}
                                onChange={(e) => setImperialData({ ...imperialData, weight_lbs: e.target.value })}
                                className="text-lg"
                            />
                        </div>
                    </>
                )}
            </CardContent>
          </Card>
        );
      case 'goals':
        return (
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">What's your primary goal?</CardTitle>
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
                className="grid grid-cols-1 gap-3"
              >
                {[
                  { value: 'Lose Weight', icon: Target },
                  { value: 'Build Muscle', icon: Dumbbell },
                  { value: 'Maintain Weight', icon: HeartPulse },
                  { value: 'Improve Health', icon: Sparkles },
                ].map(({ value, icon: Icon }) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className="flex items-center gap-4 rounded-md border-2 p-4 hover:border-primary cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                  >
                    <RadioGroupItem value={value} id={value} />
                     <Icon className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-base">{value}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        );
      case 'activity':
        return (
          <Card className="w-full max-w-lg shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">How active are you?</CardTitle>
              <CardDescription>
                Be honest! This helps estimate your daily calorie needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <RadioGroup
                value={formData.activityLevel}
                onValueChange={(value) => {
                  setFormData({ ...formData, activityLevel: value });
                  setTimeout(handleNext, 300);
                }}
                className="grid grid-cols-1 gap-3"
              >
                {[
                  { value: 'sedentary', icon: Sofa, label: 'Sedentary', description: 'Little or no exercise' },
                  { value: 'lightly_active', icon: Footprints, label: 'Lightly Active', description: 'Exercise 1-3 days/week' },
                  { value: 'moderately_active', icon: PersonStanding, label: 'Moderately Active', description: 'Exercise 3-5 days/week' },
                  { value: 'very_active', icon: Bike, label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
                  { value: 'extra_active', icon: Flame, label: 'Extra Active', description: 'Physical job or training' },
                ].map(({ value, icon: Icon, label, description }) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className="flex items-center gap-4 rounded-md border-2 p-4 hover:border-primary cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                  >
                    <RadioGroupItem value={value} id={value} className="sr-only" />
                     <Icon className="h-8 w-8 text-primary" />
                     <div>
                        <span className="font-semibold text-base">{label}</span>
                        <p className="text-sm text-muted-foreground">{description}</p>
                     </div>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        );
      case 'diet':
        return (
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">Dietary Preferences</CardTitle>
              <CardDescription>
                Likes, dislikes, allergies? The more detail, the better.
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
                rows={5}
                className="text-base"
              />
            </CardContent>
          </Card>
        );
      case 'loading':
        return (
          <div className="text-center flex flex-col items-center gap-6">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="text-3xl font-bold font-headline">
              Crafting Your Plan...
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Our AI is analyzing your inputs to create a personalized plan just
              for you. This won't take long.
            </p>
          </div>
        );
      case 'result':
        return (
            <Card className="w-full max-w-4xl animate-in fade-in-50 shadow-lg">
                <CardHeader className="text-center pb-4">
                <Sparkles className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="text-3xl mt-4 font-bold font-headline">Your 7-Day Action Plan</CardTitle>
                <CardDescription>
                    Here's your personalized starting guide to a healthier week.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {plan?.weeklyPlan.map((dayPlan, index) => {
                    const macroData = [
                        { name: 'Protein', value: dayPlan.dailyTotals.protein, color: '#38bdf8' }, // sky-400
                        { name: 'Carbs', value: dayPlan.dailyTotals.carbs, color: '#f59e0b' },   // amber-500
                        { name: 'Fat', value: dayPlan.dailyTotals.fat, color: '#f43f5e' },      // rose-500
                    ];
                    return (
                        <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold font-headline">
                            <div className="flex justify-between items-center w-full pr-2">
                                <span>{dayPlan.day}</span>
                                <span className="text-sm font-normal text-muted-foreground">{dayPlan.dailyTotals.calories} kcal</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-6 pt-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                <div className="md:col-span-1 h-48 w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                        <Pie data={macroData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                            {macroData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="flex justify-center gap-4 text-xs mt-2">
                                        <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-sky-400" /> Protein</div>
                                        <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-amber-500" /> Carbs</div>
                                        <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-rose-500" /> Fat</div>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                     <h4 className="font-semibold">Meals</h4>
                                    <ul className="space-y-3 text-muted-foreground">
                                    {Object.entries(dayPlan.meals).map(([mealType, mealName]) => {
                                        const image = getMealImage(mealName);
                                        return (
                                        <li key={mealType} className="flex items-center gap-3">
                                            {image && <Image src={image.imageUrl} alt={mealName} width={48} height={48} className="rounded-md h-12 w-12 object-cover" data-ai-hint={image.imageHint} />}
                                            <div>
                                                <b className="capitalize text-foreground">{mealType}:</b> {mealName}
                                            </div>
                                        </li>
                                        );
                                    })}
                                    </ul>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-muted/30">
                                <h4 className="font-semibold mb-2">Workout Suggestion</h4>
                                <p className="text-muted-foreground">{dayPlan.workoutSuggestion}</p>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    );
                    })}
                </Accordion>
                </CardContent>
            </Card>
        );
      case 'signup':
        return (
          <Card className="w-full max-w-sm text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline">You're All Set!</CardTitle>
              <CardDescription>
                Create an account to save your plan and unlock all features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full shadow-sm" variant="outline" onClick={handleSignUp}>
                <GoogleIcon />
                <span className="ml-2">Sign up with Google</span>
              </Button>
              <Button className="w-full bg-black hover:bg-black/80 text-white shadow-sm" onClick={handleSignUp}>
                <Apple className="mr-2 h-5 w-5" style={{ color: 'hsl(var(--primary-foreground))' }}/> Sign up with Apple
              </Button>
              <Button className="w-full shadow-sm" onClick={handleSignUp}>
                <Mail className="mr-2 h-5 w-5" /> Sign up with Email
              </Button>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground text-center w-full">By signing up, you agree to our Terms of Service.</p>
            </CardFooter>
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <span className="font-bold text-xl tracking-tight">NutriAR</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full min-h-[500px] py-20">
          {renderStep()}
        </div>

        <div className="absolute bottom-6 w-full max-w-4xl px-4">
          {showProgress && <Progress value={progress} className="mb-4 h-2" />}
          {showNav && (
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleBack} disabled={step === 'gender'}>
                <MoveLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              <StepIndicator currentStep={stepNumber} />
              <Button
                onClick={
                  step === 'diet' ? generatePlan : handleNext
                }
                className="shadow-md"
                disabled={isNextDisabled()}
              >
                {step === 'diet' ? 'Generate Plan' : 'Next'}
                <MoveRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
          {step === 'result' && (
             <div className="flex justify-center">
                <Button size="lg" onClick={() => setStep('signup')} className="shadow-lg">
                    Save Plan & Sign Up <MoveRight className="ml-2 h-5 w-5" />
                </Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

    