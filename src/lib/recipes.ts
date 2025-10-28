import { Recipe } from './types';

export const STATIC_RECIPES: Recipe[] = [
  // Breakfast
  {
    id: '1',
    recipeName: 'Protein-Packed Oatmeal',
    ingredients: ['1/2 cup rolled oats', '1 cup water or unsweetened almond milk', '1 scoop vanilla protein powder', '1 tbsp chia seeds', '1/2 cup mixed berries (fresh or frozen)', '1 tbsp chopped almonds'],
    instructions: [
      'In a small saucepan, bring water or almond milk to a gentle boil.',
      'Stir in the rolled oats and chia seeds. Reduce heat to low and simmer for 5-7 minutes, stirring occasionally, until the oats are tender and have absorbed most of the liquid.',
      'Remove from heat and let it cool for a minute.',
      'Stir in the protein powder until fully combined and smooth.',
      'Transfer to a bowl and top with mixed berries and chopped almonds before serving.'
    ],
    reasoning: 'A fantastic way to start your day with a balance of complex carbs, fiber, and a significant protein boost to keep you full and energized.',
    category: 'Breakfast',
    imageHint: 'oatmeal bowl',
    isFavorited: false,
    calories: 420,
    protein: 30,
    carbs: 55,
    fat: 12
  },
  {
    id: '2',
    recipeName: 'Scrambled Eggs & Avocado on Whole Wheat',
    ingredients: ['2 slices of whole-wheat bread, toasted', '1/2 ripe avocado', '3 large eggs', '1 tbsp milk (optional, for fluffier eggs)', '1 tsp olive oil or butter', 'Salt and freshly ground black pepper to taste', 'A pinch of red pepper flakes'],
    instructions: [
      'Lightly mash the avocado with a fork and spread it evenly over the toasted bread slices.',
      'In a small bowl, whisk together the eggs, milk (if using), salt, and pepper.',
      'Heat olive oil or butter in a non-stick skillet over medium-low heat. Pour in the egg mixture.',
      'Cook, stirring gently with a spatula, until the eggs are cooked to your desired consistency (about 2-3 minutes).',
      'Spoon the scrambled eggs over the avocado toast. Garnish with red pepper flakes for a little kick.'
    ],
    reasoning: 'A classic, nutrient-dense breakfast featuring healthy fats from avocado, high-quality protein from eggs, and fiber from whole-wheat bread.',
    category: 'Breakfast',
    imageHint: 'healthy breakfast',
    isFavorited: true,
    calories: 380,
    protein: 25,
    carbs: 30,
    fat: 18
  },
  // Lunch
  {
    id: '4',
    recipeName: 'Mediterranean Quinoa Salad',
    ingredients: ['1 cup cooked quinoa, cooled', '1 can (15 oz) chickpeas, rinsed and drained', '1 large cucumber, diced', '1 cup cherry tomatoes, halved', '1/2 red onion, thinly sliced', '1/4 cup chopped parsley', '1/4 cup crumbled feta cheese', 'Dressing: 3 tbsp extra virgin olive oil, 1 large lemon (juiced), 1 tsp dried oregano, salt, and pepper'],
    instructions: [
      'In a large salad bowl, combine the cooled quinoa, chickpeas, cucumber, cherry tomatoes, red onion, and parsley.',
      'In a separate small jar or bowl, whisk together the olive oil, lemon juice, oregano, salt, and pepper to create the dressing.',
      'Pour the dressing over the salad and toss gently to coat everything evenly.',
      'Sprinkle the crumbled feta cheese on top just before serving.'
    ],
    reasoning: 'A vibrant, light, and refreshing salad that is packed with plant-based protein, fiber, and vitamins. Perfect for a healthy and satisfying lunch.',
    category: 'Lunch',
    imageHint: 'salad',
    isFavorited: true,
    calories: 450,
    protein: 15,
    carbs: 50,
    fat: 22
  },
  {
    id: '9',
    recipeName: 'Spicy Chicken & Veggie Stir-Fry',
    ingredients: ['1 lb boneless, skinless chicken breast, cut into 1-inch cubes', '1 tbsp soy sauce', '1 head of broccoli, cut into florets', '1 red bell pepper, thinly sliced', '1 carrot, julienned', '4 oz shiitake mushrooms, sliced', 'Stir-fry Sauce: 3 tbsp low-sodium soy sauce, 1 tbsp sriracha or chili garlic sauce, 1 tbsp honey or maple syrup, 1 tsp sesame oil, 2 cloves garlic (minced), 1 tsp grated fresh ginger'],
    instructions: [
      'In a medium bowl, toss the chicken pieces with 1 tbsp of soy sauce. Set aside to marinate for at least 10 minutes.',
      'While the chicken marinates, whisk together all the stir-fry sauce ingredients in a small bowl.',
      'Heat 1 tbsp of a high-heat oil (like avocado or canola) in a large skillet or wok over high heat. Add the chicken and cook until browned and cooked through. Remove the chicken from the skillet.',
      'Add the broccoli, bell pepper, carrot, and mushrooms to the hot skillet. Stir-fry for 4-6 minutes, until vegetables are tender-crisp.',
      'Return the chicken to the skillet and pour the sauce over everything. Cook for 1-2 minutes, stirring constantly, until the sauce thickens and coats the chicken and vegetables.',
      'Serve immediately over brown rice or quinoa.'
    ],
    reasoning: 'A quick, versatile, and delicious way to get a lean protein and a variety of colorful vegetables in one flavorful meal.',
    category: 'Dinner',
    imageHint: 'vegetable stir-fry',
    isFavorited: false,
    calories: 520,
    protein: 45,
    carbs: 35,
    fat: 20
  },
  // Dinner
  {
    id: '7',
    recipeName: 'Garlic Herb Baked Salmon with Asparagus',
    ingredients: ['2 (6 oz) salmon fillets', '1 lb asparagus, trimmed', '2 tbsp extra virgin olive oil, divided', '3 cloves garlic, minced', '1 tsp mixed dried herbs (e.g., rosemary, thyme)', '1 lemon, half sliced, half for juice', 'Salt and freshly ground black pepper'],
    instructions: [
      'Preheat your oven to 400°F (200°C). Line a large baking sheet with parchment paper.',
      'Place the asparagus on one side of the baking sheet. Drizzle with 1 tbsp of olive oil, season with salt and pepper, and toss to coat.',
      'Pat the salmon fillets dry and place them on the other side of the baking sheet.',
      'In a small bowl, mix together the remaining 1 tbsp of olive oil, minced garlic, and dried herbs. Brush this mixture evenly over the top of each salmon fillet.',
      'Squeeze the juice from half the lemon over both the salmon and asparagus. Top the salmon fillets with the lemon slices.',
      'Bake for 12-15 minutes, or until the salmon is opaque and flakes easily with a fork, and the asparagus is tender.',
    ],
    reasoning: 'An elegant and incredibly healthy one-pan dinner that is quick to prepare and rich in omega-3 fatty acids and nutrients.',
    category: 'Dinner',
    imageHint: 'salmon fish',
    isFavorited: true,
    calories: 480,
    protein: 40,
    carbs: 10,
    fat: 30
  },
  // Snacks
  {
    id: '11',
    recipeName: 'No-Bake Protein Energy Bites',
    ingredients: ['1 cup old-fashioned rolled oats', '1/2 cup natural peanut or almond butter', '1/3 cup honey or pure maple syrup', '1/4 cup ground flaxseed', '2 tbsp chia seeds', '1/2 cup dark chocolate chips (optional)', '1 tsp vanilla extract'],
    instructions: [
      'In a medium bowl, thoroughly combine all ingredients. The mixture should be sticky.',
      'Cover the bowl and chill in the refrigerator for at least 30 minutes. This helps the bites hold their shape.',
      'Once chilled, roll the mixture into small, 1-inch balls.',
      'Store in an airtight container in the fridge for up to a week. They are perfect for a quick pre-workout snack or a healthy treat.'
    ],
    reasoning: 'A simple, no-bake snack that provides a quick and sustained boost of energy from complex carbs, healthy fats, and protein.',
    category: 'Snack',
    imageHint: 'cookies',
    isFavorited: false,
    calories: 150, // Per bite
    protein: 5,
    carbs: 18,
    fat: 7
  },
  // Desserts
  {
    id: '12',
    recipeName: 'Healthy Chocolate Avocado Mousse',
    ingredients: ['2 large ripe avocados, pitted', '1/2 cup unsweetened cocoa powder', '1/2 cup pure maple syrup or honey', '1/4 cup unsweetened almond milk', '1 tsp pure vanilla extract', 'A small pinch of sea salt'],
    instructions: [
      'Combine all ingredients in a high-speed blender or food processor.',
      'Blend on high for 1-2 minutes, scraping down the sides as needed, until the mixture is completely smooth, creamy, and free of any lumps.',
      'Taste and adjust sweetness if necessary.',
      'Divide the mousse into four small serving dishes. Chill in the refrigerator for at least 1 hour to allow it to firm up.',
      'Serve chilled, optionally topped with fresh raspberries or a sprinkle of sea salt.'
    ],
    reasoning: 'A surprisingly healthy and decadent dessert. The avocado creates a rich, creamy texture while providing healthy fats, making for a guilt-free indulgence.',
    category: 'Dessert',
    imageHint: 'chocolate brownie',
    isFavorited: false,
    calories: 280,
    protein: 4,
    carbs: 35,
    fat: 18
  }
];
