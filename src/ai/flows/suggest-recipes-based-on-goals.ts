'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting recipes based on user's logged meals and nutritional goals.
 *
 * - suggestRecipesBasedOnGoals - A function that suggests recipes based on user's logged meals and nutritional goals.
 * - SuggestRecipesInput - The input type for the suggestRecipesBasedOnGoals function.
 * - SuggestRecipesOutput - The return type for the suggestRecipesBasedOnGoals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipesInputSchema = z.object({
  loggedMeals: z.string().describe('The user\u0027s logged meals, as a JSON string.'),
  nutritionalGoals: z.string().describe('The user\u0027s nutritional goals, as a JSON string.'),
  userPreferences: z.string().describe('The user\u0027s food preferences, as a JSON string.'),
});
export type SuggestRecipesInput = z.infer<typeof SuggestRecipesInputSchema>;

const RecipeSuggestionSchema = z.object({
  recipeName: z.string().describe('The name of the suggested recipe.'),
  ingredients: z.array(z.string()).describe('The ingredients required for the recipe.'),
  instructions: z.array(z.string()).describe('The step-by-step cooking instructions for the recipe.'),
  nutritionalInformation: z.string().describe('Nutritional information for the recipe, as a JSON string.'),
  suitabilityScore: z.number().describe('A score indicating how well the recipe fits the user\u0027s goals.'),
  reasoning: z.string().describe('Explanation for why the recipe was chosen based on the user goals')
});

const SuggestRecipesOutputSchema = z.object({
  suggestedRecipes: z.array(RecipeSuggestionSchema).describe('An array of suggested recipes based on the user\u0027s logged meals and nutritional goals.'),
});
export type SuggestRecipesOutput = z.infer<typeof SuggestRecipesOutputSchema>;

export async function suggestRecipesBasedOnGoals(input: SuggestRecipesInput): Promise<SuggestRecipesOutput> {
  return suggestRecipesBasedOnGoalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipesPrompt',
  input: {schema: SuggestRecipesInputSchema},
  output: {schema: SuggestRecipesOutputSchema},
  prompt: `You are a nutritional advisor. You will analyze the user\u0027s logged meals, nutritional goals, and food preferences to suggest recipes that align with their dietary needs.

  Logged Meals: {{{loggedMeals}}}
  Nutritional Goals: {{{nutritionalGoals}}}
  User Preferences: {{{userPreferences}}}

  Based on this information, suggest recipes that meet the user\u0027s goals and preferences. For each recipe, explain why you chose it.
  Ensure the recipes are diverse and appealing to the user.
  Recipes should contain recipeName, ingredients, step-by-step instructions, nutritionalInformation and suitabilityScore.
  Return the recipes as a JSON array.
  `,
});

const suggestRecipesBasedOnGoalsFlow = ai.defineFlow(
  {
    name: 'suggestRecipesBasedOnGoalsFlow',
    inputSchema: SuggestRecipesInputSchema,
    outputSchema: SuggestRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
