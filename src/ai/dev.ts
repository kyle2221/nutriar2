'use server';
import {config} from 'dotenv';
config();

import '@/ai/flows/provide-adaptive-guidance.ts';
import '@/ai/flows/provide-real-time-assistance.ts';
import '@/ai/flows/suggest-recipes-based-on-goals.ts';
import '@/ai/flows/highlight-ingredients.ts';
import '@/ai/flows/log-meal-from-image.ts';
import '@/ai/flows/generate-recipe-from-ingredients.ts';
import '@/ai/flows/identify-ingredients-from-image.ts';
import '@/ai/flows/provide-personalized-plan.ts';
