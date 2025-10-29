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

const PersonalizedPlanOutputSchema = z.object({
  plan: z.string().describe('A comprehensive, personalized health and nutrition plan in markdown format. It should include sections for: Calorie & Macro Targets, Workout Recommendations, and Meal Suggestions.'),
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
  prompt: `You are an expert nutritionist and personal trainer. Based on the user's data, create a concise, actionable, and personalized health plan. The plan should be encouraging and easy to understand.

User Data:
- Gender: {{{gender}}}
- Height: {{{height}}} cm
- Weight: {{{weight}}} kg
- Goal: {{{goal}}}
- Activity Level: {{{activityLevel}}}
- Dietary Preferences: {{{dietaryPreferences}}}

Generate a plan with the following sections in markdown format:

### Daily Calorie & Macro Targets
- Provide an estimated daily calorie target.
- Provide a protein, carbohydrate, and fat target in grams.

### Workout Recommendations
- Suggest a weekly workout frequency (e.g., 3-5 times per week).
- Recommend types of workouts that align with their goal (e.g., for 'Build Muscle', suggest strength training; for 'Lose Weight', suggest a mix of cardio and resistance).

### Sample Meal Suggestions
- Suggest one simple example for breakfast, lunch, and dinner that aligns with their dietary preferences and goals.

Keep the entire plan well-structured but concise. Use headings and bullet points.
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

    