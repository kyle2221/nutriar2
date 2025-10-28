'use server';
/**
 * @fileOverview Generates a recipe based on a list of ingredients.
 *
 * - generateRecipeFromIngredients - A function that takes ingredients and creates a recipe.
 * - GenerateRecipeFromIngredientsInput - The input type, a list of ingredients.
 * - GenerateRecipeFromIngredientsOutput - The output type, a full recipe structure.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const RecipeSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.array(z.string()).describe('The ingredients for the recipe.'),
  instructions: z.array(z.string()).describe('The cooking instructions.'),
  reasoning: z.string().describe('Why this recipe is a good choice based on the ingredients provided.'),
});

export type Recipe = z.infer<typeof RecipeSchema>;

const GenerateRecipeFromIngredientsInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients available in the pantry.'),
});

const GenerateRecipeFromIngredientsOutputSchema = z.object({
  recipes: z.array(RecipeSchema).describe('An array of suggested recipes.'),
});

export type GenerateRecipeFromIngredientsInput = z.infer<
  typeof GenerateRecipeFromIngredientsInputSchema
>;
export type GenerateRecipeFromIngredientsOutput = z.infer<
  typeof GenerateRecipeFromIngredientsOutputSchema
>;

export async function generateRecipeFromIngredients(
  input: GenerateRecipeFromIngredientsInput
): Promise<GenerateRecipeFromIngredientsOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeFromIngredientsPrompt',
  input: {schema: GenerateRecipeFromIngredientsInputSchema},
  output: {schema: GenerateRecipeFromIngredientsOutputSchema},
  prompt: `You are an expert chef. Based on the ingredients provided, create a list of 3 diverse and creative recipes. For each recipe, provide a name, the full list of ingredients (including amounts), step-by-step instructions, and a brief reasoning for why it's a good use of the ingredients.

Ingredients Available: {{{json ingredients}}}

Return a JSON object with a 'recipes' array.`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFromIngredientsFlow',
    inputSchema: GenerateRecipeFromIngredientsInputSchema,
    outputSchema: GenerateRecipeFrom_IngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
