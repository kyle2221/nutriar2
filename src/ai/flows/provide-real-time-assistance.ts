'use server';

/**
 * @fileOverview An AI cooking assistant that provides real-time assistance during AR cooking sessions.
 *
 * - provideRealTimeAssistance - A function that handles the real-time assistance process.
 * - ProvideRealTimeAssistanceInput - The input type for the provideRealTimeAssistance function.
 * - ProvideRealTimeAssistanceOutput - The return type for the provideRealTimeAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideRealTimeAssistanceInputSchema = z.object({
  question: z.string().describe('The user question about the cooking process.'),
  recipeName: z.string().describe('The name of the recipe being cooked.'),
  currentStep: z.string().describe('The current step in the recipe.'),
});
export type ProvideRealTimeAssistanceInput = z.infer<typeof ProvideRealTimeAssistanceInputSchema>;

const ProvideRealTimeAssistanceOutputSchema = z.object({
  answer: z.string().describe('The AI assistant answer to the user question.'),
});
export type ProvideRealTimeAssistanceOutput = z.infer<typeof ProvideRealTimeAssistanceOutputSchema>;

export async function provideRealTimeAssistance(
  input: ProvideRealTimeAssistanceInput
): Promise<ProvideRealTimeAssistanceOutput> {
  return provideRealTimeAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideRealTimeAssistancePrompt',
  input: {schema: ProvideRealTimeAssistanceInputSchema},
  output: {schema: ProvideRealTimeAssistanceOutputSchema},
  prompt: `You are a helpful AI cooking assistant, assisting a user during an AR cooking session.

You will answer the user's question based on the current recipe, step, and any other relevant information.

Recipe Name: {{{recipeName}}}
Current Step: {{{currentStep}}}

User Question: {{{question}}}

Answer:`,
});

const provideRealTimeAssistanceFlow = ai.defineFlow(
  {
    name: 'provideRealTimeAssistanceFlow',
    inputSchema: ProvideRealTimeAssistanceInputSchema,
    outputSchema: ProvideRealTimeAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
