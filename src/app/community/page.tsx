'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const communityPosts = [
  {
    id: '1',
    author: 'HealthyChef101',
    authorAvatar: 'https://picsum.photos/seed/chef101/100/100',
    recipeId: '1',
    recipeName: 'High-Performance Protein Oatmeal',
    message: 'Just tried this protein oatmeal and it was amazing! Perfect pre-workout meal. Added a sprinkle of bee pollen for an extra boost. 🚀',
    likes: 128,
    comments: 12,
  },
  {
    id: '2',
    author: 'FitFoodie_Sarah',
    authorAvatar: 'https://picsum.photos/seed/sarahfit/100/100',
    recipeId: '4',
    recipeName: "Mediterranean Athlete's Quinoa Bowl",
    message: 'Meal prep Sunday is a success with this quinoa bowl! So colorful and delicious. I swapped chicken for grilled halloumi. #vegetarian',
    likes: 256,
    comments: 23,
  },
    {
    id: '3',
    author: 'GainsWithGabe',
    authorAvatar: 'https://picsum.photos/seed/gabe/100/100',
    recipeId: '7',
    recipeName: 'Omega-3 Rich Salmon & Asparagus',
    message: 'If you want to feel good, you gotta eat good. This salmon recipe is a game-changer for my recovery days. So simple, so effective.',
    likes: 98,
    comments: 8,
  },
   {
    id: '4',
    author: 'YogaLoverJen',
    authorAvatar: 'https://picsum.photos/seed/yoga/100/100',
    recipeId: '14',
    recipeName: 'Spicy Tuna-Stuffed Avocados',
    message: 'The perfect light but satisfying lunch. I love the kick from the sriracha. Keeps me energized for my afternoon practice. 🙏',
    likes: 154,
    comments: 15,
  },
];

const CommunityPost = ({ post }: { post: (typeof communityPosts)[0] }) => {
  const recipeImage =
    PlaceHolderImages.find(
      (p) =>
        p.id ===
        post.recipeId.toLowerCase().replace(/ /g, '-').substring(0, 10)
    ) || PlaceHolderImages.find(p => p.imageHint.includes('ai'));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.authorAvatar} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-muted-foreground">shared a recipe</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{post.message}</p>
        <Link href={`/recipes/${post.recipeId}`}>
          <div className="border rounded-lg overflow-hidden flex cursor-pointer hover:border-primary transition-colors">
            {recipeImage && (
              <Image
                src={recipeImage.imageUrl}
                alt={post.recipeName}
                width={100}
                height={100}
                className="object-cover"
              />
            )}
            <div className="p-4">
              <p className="font-semibold">{post.recipeName}</p>
              <Badge variant="outline" className="mt-2">View Recipe</Badge>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <ThumbsUp size={16} /> {post.likes}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle size={16} /> {post.comments}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function CommunityPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Community Hub
          </h1>
          <p className="text-muted-foreground">
            Discover what others are cooking and sharing.
          </p>
        </div>
        <Button>Create Post</Button>
      </div>
      <div className="max-w-2xl mx-auto space-y-6">
        {communityPosts.map((post) => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
