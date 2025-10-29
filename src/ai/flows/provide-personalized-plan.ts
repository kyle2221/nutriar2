'use server';
/**
 * @fileOverview A flow to generate a personalized health and nutrition plan.
 *
 * - providePersonalizedPlan - A function that takes user data and returns a plan.
 * - PersonalizedPlanInput - The input type for the flow.
 * - PersonalizedPlanOutput - The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PersonalizedPlanInputSchema = z.object({
  gender: z.string().describe('The user\'s biological sex (e.g., "male", "female").'),
  height: z.string().describe('The user\'s height in centimeters (e.g., "180").'),
  weight: z.string().describe('The user\'s weight in kilograms (e.g., "75").'),
  goal: z.string().describe('The user\'s primary fitness goal (e.g., "Lose Weight", "Build Muscle").'),
  activityLevel: z.string().describe('The user\'s weekly activity level (e.g., "sedentary", "moderately_active").'),
  dietaryPreferences: z.string().describe('A description of the user\'s dietary likes, dislikes, and allergies (e.g., "I love spicy food, vegetarian, allergic to nuts.").'),
});
export type PersonalizedPlanInput = z.infer<typeof PersonalizedPlanInputSchema>;

const DailyMealSchema = z.object({
  breakfast: z.string().describe("A specific meal suggestion for breakfast."),
  lunch: z.string().describe("A specific meal suggestion for lunch."),
  dinner: z.string().describe("A specific meal suggestion for dinner."),
  snack: z.string().describe("A specific healthy snack suggestion."),
});

const DailyTotalsSchema = z.object({
    calories: z.number().describe("Estimated total calories for the day."),
    protein: z.number().describe("Estimated total protein in grams for the day."),
    carbs: z.number().describe("Estimated total carbohydrates in grams for the day."),
    fat: z.number().describe("Estimated total fat in grams for the day."),
});

const DailyPlanSchema = z.object({
  day: z.string().describe('The day of the week (e.g., "Monday").'),
  meals: DailyMealSchema,
  dailyTotals: DailyTotalsSchema,
  workoutSuggestion: z.string().describe('A brief workout suggestion for the day that aligns with the user\'s main goal.'),
});

const PersonalizedPlanOutputSchema = z.object({
  weeklyPlan: z.array(DailyPlanSchema).describe('A comprehensive, 7-day personalized health and nutrition plan.'),
});
export type PersonalizedPlanOutput = z.infer<typeof PersonalizedPlanOutputSchema>;


export async function providePersonalizedPlan(
  input: PersonalizedPlanInput
): Promise<PersonalizedPlanOutput> {
  return personalizedPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPlanPrompt',
  input: { schema: PersonalizedPlanInputSchema },
  output: { schema: PersonalizedPlanOutputSchema },
  prompt: `You are an expert nutritionist and personal trainer. Based on the user's data, create a detailed and actionable 7-day health plan.

User Data:
- Gender: {{{gender}}}
- Height: {{{height}}} cm
- Weight: {{{weight}}} kg
- Goal: {{{goal}}}
- Activity Level: {{{activityLevel}}}
- Dietary Preferences: {{{dietaryPreferences}}}

Generate a structured 7-day plan. For each day of the week (Monday to Sunday):
1.  Provide specific, simple meal suggestions for Breakfast, Lunch, Dinner, and a healthy Snack. The meals must align with the user's dietary preferences.
2.  Provide a brief, actionable workout suggestion for the day that aligns with their main goal (e.g., for 'Build Muscle', suggest specific exercises; for 'Lose Weight', suggest a type of cardio). Vary the suggestions throughout the week.
3.  Calculate and provide the estimated total daily calories, protein (g), carbs (g), and fat (g) for the suggested meals.

The entire response must be a JSON object that strictly follows the output schema.
`,
});

const personalizedPlanFlow = ai.defineFlow(
  {
    name: 'personalizedPlanFlow',
    inputSchema: PersonalizedPlanInputSchema,
    outputSchema: PersonalizedPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
