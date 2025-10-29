'use server';
/**
 * @fileOverview Identifies ingredients from an image of a pantry or fridge.
 *
 * - identifyIngredientsFromImage - A function that processes an image to identify ingredients.
 * - IdentifyIngredientsFromImageInput - The input type, containing the image data URI.
 * - IdentifyIngredientsFromImageOutput - The output type, containing a list of identified ingredients.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyIngredientsFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a pantry or fridge, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyIngredientsFromImageInput = z.infer<
  typeof IdentifyIngredientsFromImageInputSchema
>;

const IdentifyIngredientsFromImageOutputSchema = z.object({
  ingredients: z.array(z.string()).describe('A list of food ingredients identified in the image.'),
});
export type IdentifyIngredientsFromImageOutput = z.infer<
  typeof IdentifyIngredientsFromImageOutputSchema
>;

export async function identifyIngredientsFromImage(
  input: IdentifyIngredientsFromImageInput
): Promise<IdentifyIngredientsFromImageOutput> {
  return identifyIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyIngredientsPrompt',
  input: {schema: IdentifyIngredientsFromImageInputSchema},
  output: {schema: IdentifyIngredientsFromImageOutputSchema},
  prompt: `You are an expert at identifying food items from an image. Analyze the provided image of a pantry, refrigerator, or countertop. Identify all the edible food ingredients you can see. Be precise and list only the ingredients.

Image: {{media url=imageDataUri}}`,
});

const identifyIngredientsFlow = ai.defineFlow(
  {
    name: 'identifyIngredientsFlow',
    inputSchema: IdentifyIngredientsFromImageInputSchema,
    outputSchema: IdentifyIngredientsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
