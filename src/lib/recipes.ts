
import { Recipe } from './types';

export const STATIC_RECIPES: Recipe[] = [
  // Breakfast
  {
    id: '1',
    recipeName: 'High-Performance Protein Oatmeal',
    ingredients: [
        '1/2 cup rolled oats (old-fashioned, not instant)', 
        '1 cup unsweetened almond milk or water', 
        '1 scoop (30g) high-quality vanilla or unflavored protein powder', 
        '1 tbsp chia seeds', 
        '1 tbsp ground flaxseed',
        '1/2 cup mixed berries (fresh or frozen)', 
        '1 tbsp chopped walnuts or almonds',
        'Pinch of cinnamon'
    ],
    instructions: [
      'Combine almond milk (or water), oats, chia seeds, and flaxseed in a small saucepan. Bring to a simmer over medium heat, then reduce heat to low.',
      'Cook for 5-7 minutes, stirring occasionally, until the oats are creamy and have absorbed most of the liquid. Stir in the cinnamon.',
      'Remove the saucepan from the heat and let it cool for 1-2 minutes. This is crucial to prevent the protein powder from clumping.',
      'Gradually stir in the protein powder until it is completely dissolved and the oatmeal is smooth.',
      'Pour the oatmeal into a bowl and top with mixed berries and chopped nuts for added antioxidants and healthy fats.'
    ],
    reasoning: 'A powerhouse breakfast designed to fuel muscle recovery and provide sustained energy. It\'s packed with complex carbs, fiber, complete protein, and healthy omega-3 fatty acids.',
    category: 'Breakfast',
    imageHint: 'oatmeal bowl',
    isFavorited: false,
    calories: 450,
    protein: 35,
    carbs: 50,
    fat: 15,
    reviews: [
        { author: 'Alex G.', avatarUrl: 'https://picsum.photos/seed/alex/100/100', rating: 5, comment: 'My go-to breakfast before a morning run. Keeps me full for hours!' },
        { author: 'Maria S.', avatarUrl: 'https://picsum.photos/seed/maria/100/100', rating: 4, comment: 'Great recipe. I use chocolate protein powder to make it a bit more decadent.' }
    ]
  },
  {
    id: '2',
    recipeName: 'Avocado & Egg Power Toast',
    ingredients: [
        '2 slices of sprouted whole-grain bread, toasted', 
        '1 whole ripe avocado', 
        '2 large pasture-raised eggs', 
        '1 tsp extra virgin olive oil', 
        '1 tbsp hemp seeds',
        'Everything bagel seasoning or red pepper flakes to taste', 
        'Salt and freshly ground black pepper to taste'
    ],
    instructions: [
      'While the bread is toasting, heat olive oil in a non-stick skillet over medium heat. Crack the eggs into the skillet and cook sunny-side up, or to your preference (about 2-3 minutes for a runny yolk).',
      'Mash the avocado in a small bowl. Season with a pinch of salt and pepper.',
      'Spread the mashed avocado evenly over the two slices of toasted bread.',
      'Carefully place a cooked egg on top of each slice of avocado toast.',
      'Sprinkle with hemp seeds for extra protein and a dash of everything bagel seasoning for flavor.'
    ],
    reasoning: 'This meal provides a perfect balance of healthy monounsaturated fats from avocado, high-quality protein from eggs and hemp seeds, and complex carbohydrates for lasting energy.',
    category: 'Breakfast',
    imageHint: 'healthy breakfast',
    isFavorited: true,
    calories: 410,
    protein: 22,
    carbs: 32,
    fat: 21,
    reviews: [
        { author: 'John D.', avatarUrl: 'https://picsum.photos/seed/john/100/100', rating: 5, comment: 'Simple, effective, and delicious. Can\'t ask for more.' },
    ]
  },
  {
    id: '13',
    recipeName: 'Green Protein Power Smoothie',
    ingredients: [
      '1 cup spinach or kale',
      '1/2 frozen banana',
      '1 scoop vanilla or unflavored protein powder',
      '1 tbsp almond butter',
      '1 cup unsweetened almond milk',
      '1/2 cup water',
      'Ice cubes (optional)'
    ],
    instructions: [
      'Place all ingredients into a high-speed blender.',
      'Blend on high until the mixture is completely smooth and creamy.',
      'If the smoothie is too thick, add a little more water or almond milk until it reaches your desired consistency.',
      'Pour into a glass and enjoy immediately for the best taste and nutrient retention.'
    ],
    reasoning: 'A quick, nutrient-dense breakfast or snack that\'s easy to digest. It delivers a blast of vitamins, minerals, and protein to kickstart your day or refuel after a workout.',
    category: 'Breakfast',
    imageHint: 'green smoothie',
    isFavorited: false,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 12,
    reviews: [
      { author: 'Chloe W.', avatarUrl: 'https://picsum.photos/seed/chloe/100/100', rating: 5, comment: 'So easy to make in the morning and tastes amazing!' },
      { author: 'Ben R.', avatarUrl: 'https://picsum.photos/seed/ben/100/100', rating: 4, comment: 'I add a handful of frozen pineapple to mine for a tropical twist.' },
    ]
  },
  // Lunch
  {
    id: '4',
    recipeName: 'Mediterranean Athlete\'s Quinoa Bowl',
    ingredients: [
        '1 cup cooked quinoa, cooled', 
        '4 oz grilled chicken breast, diced',
        '1 can (15 oz) chickpeas, rinsed and drained', 
        '1 large cucumber, diced', 
        '1 cup cherry tomatoes, halved', 
        '1/2 red onion, finely diced', 
        '1/4 cup chopped fresh parsley', 
        '2 tbsp Kalamata olives, halved',
        'Dressing: 3 tbsp extra virgin olive oil, 1 large lemon (juiced), 1 clove garlic (minced), 1 tsp dried oregano, salt, and pepper'
    ],
    instructions: [
      'First, prepare the dressing. In a small jar with a lid, combine the olive oil, lemon juice, minced garlic, oregano, salt, and pepper. Shake well until emulsified.',
      'In a large mixing bowl, combine the cooled quinoa, grilled chicken, chickpeas, cucumber, cherry tomatoes, red onion, parsley, and Kalamata olives.',
      'Pour the dressing over the quinoa mixture. Toss gently until all ingredients are well-coated and the flavors have melded.',
      'For best results, let the salad sit for at least 10 minutes before serving to allow the flavors to marinate. Serve chilled or at room temperature.'
    ],
    reasoning: 'An ideal lunch for recovery and fuel, this bowl is loaded with lean protein from chicken, plant-based protein and fiber from chickpeas and quinoa, and anti-inflammatory healthy fats.',
    category: 'Lunch',
    imageHint: 'salad',
    isFavorited: true,
    calories: 550,
    protein: 40,
    carbs: 55,
    fat: 20,
    reviews: []
  },
  {
    id: '14',
    recipeName: 'Spicy Tuna-Stuffed Avocados',
    ingredients: [
      '2 ripe avocados, halved and pitted',
      '1 can (5 oz) wild-caught tuna in water, drained',
      '2 tbsp plain Greek yogurt or mayonnaise',
      '1 tbsp sriracha or hot sauce, or to taste',
      '1 green onion, thinly sliced',
      'Juice of 1/2 lime',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Scoop out a small amount of flesh from the center of each avocado half to create a larger well. Set the scooped-out avocado aside.',
      'In a medium bowl, combine the drained tuna, Greek yogurt, sriracha, green onion, and lime juice. Mix well.',
      'Gently fold in the extra avocado flesh you scooped out.',
      'Season the tuna mixture with salt and pepper to your liking.',
      'Fill each avocado half generously with the spicy tuna mixture. Serve immediately.'
    ],
    reasoning: 'A low-carb, high-protein lunch that is incredibly satisfying. The healthy fats from the avocado combined with the lean protein from tuna provide lasting energy and support muscle maintenance.',
    category: 'Lunch',
    imageHint: 'avocado dish',
    isFavorited: false,
    calories: 450,
    protein: 35,
    carbs: 18,
    fat: 28,
    reviews: [
      { author: 'Mike P.', avatarUrl: 'https://picsum.photos/seed/mike/100/100', rating: 5, comment: 'So quick and delicious. I make this for lunch at least twice a week.' },
    ]
  },
  // Dinner
  {
    id: '7',
    recipeName: 'Omega-3 Rich Salmon & Asparagus',
    ingredients: [
        '2 (6 oz) wild-caught salmon fillets, skin on or off', 
        '1 bunch of asparagus, trimmed', 
        '1 tbsp extra virgin olive oil', 
        '2 cloves garlic, minced', 
        '1 tsp dried dill or 1 tbsp fresh dill, chopped', 
        '1 whole lemon, half sliced, half for juice', 
        'Sea salt and freshly ground black pepper'
    ],
    instructions: [
      'Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper for easy cleanup.',
      'Place the asparagus on the baking sheet. Drizzle with half of the olive oil, season with salt and pepper, and toss to coat. Arrange in a single layer.',
      'Pat the salmon fillets completely dry with a paper towel. This is key for a crispy skin if leaving it on. Place the fillets on the baking sheet next to the asparagus.',
      'In a small bowl, mix the remaining olive oil, minced garlic, and dill. Brush this mixture evenly over the top of each salmon fillet.',
      'Squeeze the juice from half the lemon over both the salmon and asparagus. Top each salmon fillet with 2-3 thin lemon slices.',
      'Bake for 12-15 minutes. The salmon is done when it is opaque and flakes easily with a fork. The asparagus should be tender-crisp.'
    ],
    reasoning: 'This dish is a nutritional powerhouse, rich in anti-inflammatory omega-3 fatty acids, lean protein, and essential vitamins from the asparagus. It\'s a simple, clean meal that supports brain and heart health.',
    category: 'Dinner',
    imageHint: 'salmon fish',
    isFavorited: true,
    calories: 490,
    protein: 42,
    carbs: 8,
    fat: 32,
    reviews: [
      { author: 'Dr. Evans', avatarUrl: 'https://picsum.photos/seed/evans/100/100', rating: 5, comment: 'An excellent meal for heart health. The omega-3s are crucial.' },
      { author: 'FitnessFrank', avatarUrl: 'https://picsum.photos/seed/frank/100/100', rating: 5, comment: 'Perfect post-workout dinner. Tastes incredible.' },
    ]
  },
  {
    id: '9',
    recipeName: 'Lean Body Chicken & Broccoli Stir-Fry',
    ingredients: [
        '1 lb boneless, skinless chicken breast, cut into 1-inch cubes', 
        '1 large head of broccoli, cut into florets', 
        '1 red bell pepper, sliced', 
        '1 cup sliced mushrooms (cremini or shiitake)',
        'Stir-fry Sauce: 1/4 cup low-sodium soy sauce or tamari, 1 tbsp honey or maple syrup, 1 tbsp rice vinegar, 2 cloves garlic (minced), 1 tsp fresh ginger (grated), 1 tsp sesame oil',
        '1 tbsp avocado oil for cooking',
        '1/4 cup chopped cashews (optional)'
    ],
    instructions: [
      'In a small bowl, whisk together all the ingredients for the stir-fry sauce. Set aside.',
      'Heat the avocado oil in a large skillet or wok over medium-high heat. Add the chicken cubes and season with a pinch of salt and pepper. Cook until golden brown and cooked through, about 5-7 minutes. Remove chicken from the skillet and set aside.',
      'Add the broccoli florets and bell pepper to the same skillet. Stir-fry for 3-4 minutes until they begin to get tender-crisp. Add a splash of water and cover for 2 minutes to steam the broccoli.',
      'Add the mushrooms and cook for another 2 minutes until softened.',
      'Return the cooked chicken to the skillet. Pour the prepared sauce over everything and stir to coat. Let it simmer for 1-2 minutes until the sauce has slightly thickened.',
      'Garnish with chopped cashews if desired and serve immediately with brown rice or quinoa.'
    ],
    reasoning: 'A high-protein, low-carb meal perfect for a post-workout dinner. It\'s packed with lean muscle-building protein and nutrient-dense vegetables to support recovery.',
    category: 'Dinner',
    imageHint: 'vegetable stir-fry',
    isFavorited: false,
    calories: 480,
    protein: 50,
    carbs: 25,
    fat: 20,
    reviews: []
  },
  {
    id: '15',
    recipeName: 'Turkey & Black Bean Burgers',
    ingredients: [
      '1 lb lean ground turkey',
      '1 can (15 oz) black beans, rinsed, drained, and roughly mashed',
      '1/2 cup breadcrumbs or rolled oats',
      '1 egg, lightly beaten',
      '1/2 red onion, finely chopped',
      '2 cloves garlic, minced',
      '1 tsp cumin',
      '1 tsp chili powder',
      'Whole-wheat buns and your favorite toppings for serving'
    ],
    instructions: [
      'In a large bowl, combine the ground turkey, mashed black beans, breadcrumbs, egg, red onion, garlic, cumin, and chili powder.',
      'Gently mix with your hands until just combined. Do not overmix.',
      'Divide the mixture into four equal portions and shape them into patties, about 1/2 inch thick.',
      'Heat a grill or large skillet over medium heat. Lightly oil the grates or pan.',
      'Cook the patties for 6-8 minutes per side, or until cooked through and no longer pink in the center.',
      'Serve on whole-wheat buns with toppings like lettuce, tomato, and avocado.'
    ],
    reasoning: 'A healthier, leaner alternative to traditional beef burgers. The combination of turkey and black beans provides a double dose of protein and a significant amount of fiber.',
    category: 'Dinner',
    imageHint: 'burger',
    isFavorited: false,
    calories: 420,
    protein: 45,
    carbs: 30,
    fat: 14,
    reviews: [
      { author: 'Sam K.', avatarUrl: 'https://picsum.photos/seed/sam/100/100', rating: 5, comment: 'Juicy and flavorful! You don\'t even miss the beef.' },
      { author: 'Jenna H.', avatarUrl: 'https://picsum.photos/seed/jenna/100/100', rating: 4, comment: 'I added a little jalapeño for a kick. Delicious!' },
    ]
  },
  // Snacks
  {
    id: '11',
    recipeName: 'Athlete\'s Fuel Protein Bites',
    ingredients: [
        '1 cup old-fashioned rolled oats', 
        '1/2 cup natural, sugar-free peanut butter or almond butter', 
        '1/3 cup raw honey or pure maple syrup', 
        '1/2 cup ground flaxseed', 
        '2 scoops (60g) chocolate or vanilla whey protein powder',
        '2 tbsp chia seeds', 
        '1/4 cup water or almond milk, as needed'
    ],
    instructions: [
      'In a large bowl, combine the rolled oats, peanut butter, honey, ground flaxseed, protein powder, and chia seeds. Mix well until a thick, sticky dough forms.',
      'If the mixture is too dry or crumbly, add water or almond milk, one tablespoon at a time, until it holds together well.',
      'Cover the bowl and place it in the refrigerator to chill for at least 30 minutes. This will make the mixture easier to handle.',
      'Once chilled, use your hands to roll the mixture into 1-inch balls. You should get about 20-24 bites.',
      'Store the protein bites in an airtight container in the refrigerator for up to two weeks. They are an ideal on-the-go snack for pre- or post-workout fuel.'
    ],
    reasoning: 'These no-bake bites are the perfect grab-and-go snack, providing a quick hit of protein for muscle repair and complex carbs for sustained energy, without any refined sugar.',
    category: 'Snack',
    imageHint: 'cookies',
    isFavorited: false,
    calories: 130, // Per bite
    protein: 8,
    carbs: 12,
    fat: 6,
    reviews: []
  },
  {
    id: '16',
    recipeName: 'Crispy Roasted Chickpeas',
    ingredients: [
      '1 can (15 oz) chickpeas, rinsed and drained',
      '1 tbsp olive oil',
      '1/2 tsp smoked paprika',
      '1/2 tsp garlic powder',
      '1/4 tsp cayenne pepper (optional)',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Dry the chickpeas thoroughly with a paper towel. This is the key to getting them crispy. Remove any loose skins.',
      'In a bowl, toss the chickpeas with olive oil, paprika, garlic powder, cayenne, salt, and pepper until evenly coated.',
      'Spread the chickpeas in a single layer on a baking sheet.',
      'Roast for 20-25 minutes, shaking the pan halfway through, until the chickpeas are golden and crispy.',
      'Let them cool slightly before eating. They will get crispier as they cool.'
    ],
    reasoning: 'A crunchy, savory, and high-fiber snack that satisfies cravings for something salty. A much healthier alternative to chips, providing plant-based protein and nutrients.',
    category: 'Snack',
    imageHint: 'chickpeas',
    isFavorited: false,
    calories: 220,
    protein: 8,
    carbs: 27,
    fat: 9,
    reviews: [
        { author: 'Dana V.', avatarUrl: 'https://picsum.photos/seed/dana/100/100', rating: 5, comment: 'Addicting! I make a big batch at the start of the week.' },
    ]
  },
  // Desserts
  {
    id: '12',
    recipeName: 'Greek Yogurt Protein "Cheesecake"',
    ingredients: [
        '2 cups plain non-fat Greek yogurt',
        '2 scoops (60g) vanilla casein protein powder',
        '1/4 cup erythritol or other non-caloric sweetener',
        '1 whole egg',
        '1 tsp vanilla extract',
        'Juice of 1/2 lemon',
        'Crust: 1/2 cup almond flour, 2 tbsp melted coconut oil, 1 tbsp erythritol'
    ],
    instructions: [
      'Preheat oven to 325°F (160°C). In a small bowl, mix together the almond flour, melted coconut oil, and 1 tbsp erythritol for the crust. Press this mixture firmly into the bottom of a 6-inch springform pan.',
      'Bake the crust for 10 minutes, then let it cool.',
      'In a large bowl, whisk the Greek yogurt until smooth. Slowly whisk in the casein protein powder until no lumps remain. Casein is key for a thick, cheesecake-like texture.',
      'Whisk in the sweetener, egg, vanilla extract, and lemon juice until the mixture is smooth and creamy.',
      'Pour the yogurt filling over the cooled crust and spread evenly.',
      'Bake for 30-35 minutes, or until the center is almost set (it should still have a slight jiggle). Turn off the oven and let the cheesecake cool in the oven with the door cracked for 1 hour. This prevents cracking.',
      'Remove from the oven, let it cool to room temperature, then refrigerate for at least 4 hours, or preferably overnight. Serve chilled with fresh berries.'
    ],
    reasoning: 'A guilt-free dessert that tastes decadent but is packed with slow-digesting casein protein, making it a great option for a satisfying, muscle-building nighttime treat.',
    category: 'Dessert',
    imageHint: 'chocolate cake',
    isFavorited: false,
    calories: 250, // Per slice
    protein: 25,
    carbs: 10,
    fat: 12,
    reviews: []
  },
  {
    id: '17',
    recipeName: 'Avocado Chocolate Mousse',
    ingredients: [
      '2 ripe avocados',
      '1/2 cup unsweetened cocoa powder',
      '1/2 cup maple syrup or honey',
      '1/4 cup unsweetened almond milk',
      '1 tsp vanilla extract',
      'Pinch of salt'
    ],
    instructions: [
      'Combine all ingredients in a high-speed blender or food processor.',
      'Blend until completely smooth, stopping to scrape down the sides as needed.',
      'Taste and adjust sweetness if necessary.',
      'Divide the mousse into small serving dishes and refrigerate for at least 30 minutes to an hour to chill and firm up.',
      'Serve chilled, topped with fresh berries or a sprinkle of cocoa powder.'
    ],
    reasoning: 'A surprisingly healthy and incredibly creamy dessert. The avocado provides healthy fats and a silky texture, while the cocoa powder is rich in antioxidants. It satisfies chocolate cravings without the guilt.',
    category: 'Dessert',
    imageHint: 'chocolate mousse',
    isFavorited: true,
    calories: 280,
    protein: 5,
    carbs: 35,
    fat: 18,
    reviews: [
      { author: 'Sara L.', avatarUrl: 'https://picsum.photos/seed/sara/100/100', rating: 5, comment: 'You can\'t even taste the avocado! So rich and creamy.' },
      { author: 'Tom F.', avatarUrl: 'https://picsum.photos/seed/tom/100/100', rating: 5, comment: 'My kids love this and have no idea it\'s healthy.' },
    ]
  }
];
