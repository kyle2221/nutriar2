import Image from 'next/image';
import { ArCookingView } from '@/components/ar-cooking-view';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

const sampleRecipe = {
  recipeName: 'Spicy Quinoa Bowl with Roasted Chickpeas',
  ingredients: [
    '1 cup quinoa',
    '2 cups vegetable broth',
    '1 can (15 ounces) chickpeas, rinsed and drained',
    '1 tablespoon olive oil',
    '1 teaspoon smoked paprika',
    '1/2 teaspoon cayenne pepper',
    '1 avocado, sliced',
    '1/2 cup cherry tomatoes, halved',
    '1/4 cup red onion, thinly sliced',
    'Lime wedges, for serving',
  ],
  instructions: [
    'Preheat oven to 400°F (200°C).',
    'Rinse quinoa under cold water. In a medium saucepan, combine quinoa and vegetable broth. Bring to a boil, then reduce heat, cover, and simmer for 15-20 minutes.',
    'On a baking sheet, toss chickpeas with olive oil, paprika, and cayenne pepper. Roast for 20-25 minutes, until crispy.',
    'Fluff the cooked quinoa with a fork.',
    'Assemble the bowls: Divide quinoa among bowls. Top with roasted chickpeas, avocado, tomatoes, and red onion.',
    'Serve with lime wedges on the side.',
  ],
  reasoning:
    'This recipe is chosen for its high protein content from quinoa and chickpeas, supporting muscle gain. It is gluten-free and aligns with the preference for spicy, Mediterranean-style flavors, while being low in oil.',
};

export default function SingleRecipePage({ params }: { params: { id: string } }) {
  const placeholderImage = PlaceHolderImages[(parseInt(params.id, 10) - 1) % PlaceHolderImages.length];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Image
                src={placeholderImage.imageUrl}
                alt={sampleRecipe.recipeName}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto shadow-lg"
                data-ai-hint={placeholderImage.imageHint}
              />
            </div>
            <div className="md:w-2/3">
              <CardTitle className="text-4xl font-bold font-headline mb-4">
                {sampleRecipe.recipeName}
              </CardTitle>
              <CardDescription className="text-lg">{sampleRecipe.reasoning}</CardDescription>
              <Separator className="my-6" />
              <h3 className="font-semibold text-xl font-headline mb-4">Ingredients</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
                {sampleRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-6" />
          <h3 className="font-semibold text-xl font-headline mb-6">Instructions</h3>
          <div className="space-y-6">
            {sampleRecipe.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-base">
                  {i + 1}
                </div>
                <p className="flex-1 pt-0.5 text-base">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ArCookingView recipe={sampleRecipe} />
    </div>
  );
}
