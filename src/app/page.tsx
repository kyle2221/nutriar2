'use client';

import { Button } from '@/components/ui/button';
import { Leaf, Zap, BrainCircuit, ChefHat } from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="flex flex-col items-center p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold font-headline">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

export default function GetStartedPage() {
    return (
        <div className="flex-1 w-full bg-background">
            <section className="relative w-full py-24 text-center md:py-32 lg:py-40">
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", opacity: 0.1 }}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="container relative z-10 px-4 mx-auto md:px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-center mb-6">
                           <Leaf className="w-16 h-16 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter font-headline sm:text-5xl md:text-6xl">
                            Welcome to NutriAR
                        </h1>
                        <p className="max-w-xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
                            Your personal AI-powered AR cooking and nutrition assistant. Achieve your health goals with intelligent meal planning and interactive cooking experiences.
                        </p>
                        <div className="mt-8">
                            <Link href="/dashboard" passHref>
                                <Button size="lg">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-card md:py-24">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="grid gap-12 md:grid-cols-3">
                       <FeatureCard 
                            icon={Zap}
                            title="Log Meals with AI"
                            description="Snap a photo of your meal, and let our AI analyze and log the nutritional content for you instantly."
                       />
                       <FeatureCard 
                            icon={ChefHat}
                            title="Pantry Pal Recipes"
                            description="Scan your pantry or fridge, and get creative recipe suggestions based on the ingredients you already have."
                       />
                       <FeatureCard 
                            icon={BrainCircuit}
                            title="AR Cooking Assistant"
                            description="Follow recipes with an interactive AR assistant that guides you step-by-step, right in your kitchen."
                       />
                    </div>
                </div>
            </section>
        </div>
    );
}
