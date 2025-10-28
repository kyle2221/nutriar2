'use server';
/**
 * @fileOverview Highlights ingredients needed in a recipe using AR, providing nutritional information.
 *
 * - highlightIngredients - A function that processes a recipe and highlights ingredients in AR.
 * - HighlightIngredientsInput - The input type for the highlightIngredients function, including the recipe and AR context.
 * - HighlightIngredientsOutput - The return type for the highlightIngredients function, providing instructions and nutritional data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightIngredientsInputSchema = z.object({
  recipe: z.string().describe('The full text of the recipe to be followed.'),
  arContext: z
    .string()
    .describe(
      'Description of the current AR environment, including identified objects and spatial layout.'
    ),
});
export type HighlightIngredientsInput = z.infer<typeof HighlightIngredientsInputSchema>;

const HighlightIngredientsOutputSchema = z.object({
  instructions: z
    .string()
    .describe(
      'AR instructions for highlighting ingredients, specifying location and highlighting method.'
    ),
  nutritionalInfo: z
    .string()
    .describe('Aggregated nutritional information for the highlighted ingredients.'),
});
export type HighlightIngredientsOutput = z.infer<typeof HighlightIngredientsOutputSchema>;

export async function highlightIngredients(input: HighlightIngredientsInput): Promise<HighlightIngredientsOutput> {
  return highlightIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightIngredientsPrompt',
  input: {schema: HighlightIngredientsInputSchema},
  output: {schema: HighlightIngredientsOutputSchema},
  prompt: `You are an AI assistant that guides users through recipes in an AR environment. Analyze the recipe and identify the ingredients needed for the next step. Provide AR instructions to highlight these ingredients within the user's kitchen, based on the provided AR context. Also, provide aggregated nutritional information for the identified ingredients.

Recipe: {{{recipe}}}
AR Context: {{{arContext}}}

Instructions:`,
});

const highlightIngredientsFlow = ai.defineFlow(
  {
    name: 'highlightIngredientsFlow',
    inputSchema: HighlightIngredientsInputSchema,
    outputSchema: HighlightIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
