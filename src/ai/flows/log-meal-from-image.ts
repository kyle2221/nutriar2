'use server';
/**
 * @fileOverview Identifies a meal from an image and provides nutritional information.
 *
 * - logMealFromImage - A function that processes an image to identify a meal and its nutrition.
 * - LogMealFromImageInput - The input type, containing the image data URI.
 * - LogMealFromImageOutput - The output type, containing the meal's name and nutritional info.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LogMealFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a meal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type LogMealFromImageInput = z.infer<typeof LogMealFromImageInputSchema>;

const LogMealFromImageOutputSchema = z.object({
  name: z.string().describe('The descriptive name of the meal.'),
  calories: z.number().describe('Estimated calories in kcal.'),
  protein: z.number().describe('Estimated protein in grams.'),
  carbs: z.number().describe('Estimated carbohydrates in grams.'),
  fat: z.number().describe('Estimated fat in grams.'),
});
export type LogMealFromImageOutput = z.infer<
  typeof LogMealFromImageOutputSchema
>;

export async function logMealFromImage(
  input: LogMealFromImageInput
): Promise<LogMealFromImageOutput> {
  return logMealFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'logMealFromImagePrompt',
  input: {schema: LogMealFromImageInputSchema},
  output: {schema: LogMealFromImageOutputSchema},
  prompt: `You are a nutrition expert. Analyze the meal in the image and provide a descriptive name for it. Also, provide an accurate estimate of its nutritional content: calories (in kcal), protein (in grams), carbohydrates (in grams), and fat (in grams). Your response should be in JSON format.

Image: {{media url=imageDataUri}}`,
});

const logMealFromImageFlow = ai.defineFlow(
  {
    name: 'logMealFromImageFlow',
    inputSchema: LogMealFromImageInputSchema,
    outputSchema: LogMealFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
