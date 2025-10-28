import { Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="text-center">
        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight font-headline">
          Community Recipe Sharing
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          This feature is coming soon! Share your AR cooking experiences and discover recipes from the community.
        </p>
      </div>
    </div>
  );
}
