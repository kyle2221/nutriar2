'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const features = [
  'Unlimited AI Recipe Generation',
  'Personalized Meal Planning',
  'AR Cooking Assistant',
  'Pantry Pal Ingredient Scanner',
  'Community Access & Sharing',
  'Priority Support',
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();

  const handleChoosePlan = (planName: string) => {
    toast({
        title: 'Subscription Started!',
        description: `You have successfully subscribed to the ${planName} plan.`,
    });
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl">
          Find the Perfect Plan
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-xl">
          Unlock the full power of NutriAR and start your journey to a healthier
          lifestyle today. No commitments, cancel anytime.
        </p>
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-cycle">Yearly</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className={cn("flex flex-col", !isYearly && "border-primary border-2")}>
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
            <CardDescription>
              Perfect for getting started and trying everything out.
            </CardDescription>
            <div className="flex items-baseline pt-4">
              <span className="text-4xl font-bold">$2.49</span>
              <span className="ml-1 text-xl font-normal text-muted-foreground">
                /month
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleChoosePlan('Monthly')}>
              Choose Monthly
            </Button>
          </CardFooter>
        </Card>

        <Card className={cn("flex flex-col relative", isYearly && "border-primary border-2")}>
           <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
            <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Best Value
            </div>
          </div>
          <CardHeader>
            <CardTitle>Yearly</CardTitle>
            <CardDescription>
              Save over 15% and commit to your health for the long run.
            </CardDescription>
            <div className="flex items-baseline pt-4">
              <span className="text-4xl font-bold">$24.99</span>
              <span className="ml-1 text-xl font-normal text-muted-foreground">
                /year
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleChoosePlan('Yearly')}>
              Choose Yearly
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
