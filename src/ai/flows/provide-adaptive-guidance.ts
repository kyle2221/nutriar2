'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing adaptive cooking guidance using AR. 
 *
 * The flow takes a description of the current cooking step and user's action as input, and returns feedback and next steps.
 * @interface ProvideAdaptiveGuidanceInput - The input schema for the provideAdaptiveGuidance flow.
 * @interface ProvideAdaptiveGuidanceOutput - The output schema for the provideAdaptiveGuidance flow.
 * @function provideAdaptiveGuidance - The main function to trigger the adaptive guidance flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAdaptiveGuidanceInputSchema = z.object({
  currentStepDescription: z
    .string()
    .describe('The description of the current cooking step.'),
  userActionDescription: z
    .string()
    .describe('The description of the user\'s action in the current step.'),
});
export type ProvideAdaptiveGuidanceInput = z.infer<
  typeof ProvideAdaptiveGuidanceInputSchema
>;

const ProvideAdaptiveGuidanceOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user\'s action.'),
  nextStepSuggestion: z.string().describe('Suggestion for the next step.'),
});
export type ProvideAdaptiveGuidanceOutput = z.infer<
  typeof ProvideAdaptiveGuidanceOutputSchema
>;

export async function provideAdaptiveGuidance(
  input: ProvideAdaptiveGuidanceInput
): Promise<ProvideAdaptiveGuidanceOutput> {
  return provideAdaptiveGuidanceFlow(input);
}

const provideAdaptiveGuidancePrompt = ai.definePrompt({
  name: 'provideAdaptiveGuidancePrompt',
  input: {schema: ProvideAdaptiveGuidanceInputSchema},
  output: {schema: ProvideAdaptiveGuidanceOutputSchema},
  prompt: `You are an AI cooking assistant providing real-time feedback during an AR cooking session.

  Based on the description of the current cooking step and the user\'s action, provide feedback and suggest the next step.

  Current Step Description: {{{currentStepDescription}}}
  User Action Description: {{{userActionDescription}}}

  Feedback:
  Next Step Suggestion: `,
});

const provideAdaptiveGuidanceFlow = ai.defineFlow(
  {
    name: 'provideAdaptiveGuidanceFlow',
    inputSchema: ProvideAdaptiveGuidanceInputSchema,
    outputSchema: ProvideAdaptiveGuidanceOutputSchema,
  },
  async input => {
    const {output} = await provideAdaptiveGuidancePrompt(input);
    return output!;
  }
);
