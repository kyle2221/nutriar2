'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Sparkles, Bot, User } from 'lucide-react';
import { highlightIngredients } from '@/ai/flows/highlight-ingredients';
import { provideAdaptiveGuidance } from '@/ai/flows/provide-adaptive-guidance';
import { provideRealTimeAssistance } from '@/ai/flows/provide-real-time-assistance';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type ArCookingViewProps = {
  recipe: {
    recipeName: string;
    instructions: string[];
    ingredients: string[];
  };
};

// Helper to format JSON strings nicely
const JsonDisplay = ({ data }: { data: string }) => {
  try {
    const parsed = JSON.parse(data);
    return (
      <pre className="mt-2 w-full rounded-md bg-secondary p-4 text-sm">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    );
  } catch {
    return <p className="text-muted-foreground">{data}</p>;
  }
};

const IngredientHighlighter = ({ recipe }: ArCookingViewProps) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ instructions: string; nutritionalInfo: string } | null>(null);

  const handleHighlight = async () => {
    setLoading(true);
    const res = await highlightIngredients({
      recipe: `Recipe: ${recipe.recipeName}. Ingredients: ${recipe.ingredients.join(', ')}. Instructions: ${recipe.instructions.join(' ')}`,
      arContext: 'User is in a modern kitchen. A pantry is to the left, refrigerator to the right. Countertop has a cutting board and a knife set.',
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AR Ingredient Highlighting</CardTitle>
        <CardDescription>
          Use AI to identify and highlight ingredients in your kitchen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleHighlight} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Highlight Ingredients for Next Step
        </Button>
        {result && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold">AR Instructions:</h4>
              <p className="text-muted-foreground">{result.instructions}</p>
            </div>
            <div>
              <h4 className="font-semibold">Nutritional Info:</h4>
              <JsonDisplay data={result.nutritionalInfo} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AdaptiveGuidance = ({ recipe }: ArCookingViewProps) => {
    const [loading, setLoading] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [userAction, setUserAction] = useState('');
    const [result, setResult] = useState<{ feedback: string; nextStepSuggestion: string } | null>(null);

    const handleGuidance = async () => {
        setLoading(true);
        const res = await provideAdaptiveGuidance({
            currentStepDescription: recipe.instructions[stepIndex],
            userActionDescription: userAction,
        });
        setResult(res);
        setLoading(false);
    };

    return (
         <Card>
            <CardHeader>
                <CardTitle>AI-Enhanced AR Cooking Guidance</CardTitle>
                <CardDescription>Get adaptive feedback on your cooking techniques.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Current Step ({stepIndex + 1}/{recipe.instructions.length}):</h4>
                    <p className="text-muted-foreground p-2 bg-secondary rounded-md">{recipe.instructions[stepIndex]}</p>
                </div>
                 <Textarea
                    placeholder="Describe your action (e.g., 'I just chopped the onions into fine pieces.')"
                    value={userAction}
                    onChange={(e) => setUserAction(e.target.value)}
                />
                <div className="flex gap-2">
                    <Button onClick={handleGuidance} disabled={loading || !userAction}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Get Feedback
                    </Button>
                     <Button variant="outline" onClick={() => setStepIndex(prev => (prev + 1) % recipe.instructions.length)} >Next Step</Button>
                </div>
                {result && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <h4 className="font-semibold">AI Feedback:</h4>
                            <p className="text-muted-foreground">{result.feedback}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Next Suggestion:</h4>
                            <p className="text-muted-foreground">{result.nextStepSuggestion}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const AiAssistant = ({ recipe }: ArCookingViewProps) => {
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState<Message[]>([]);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        const newConversation: Message[] = [...conversation, { role: 'user', content: question }];
        setConversation(newConversation);
        setQuestion('');
        setLoading(true);

        const res = await provideRealTimeAssistance({
            question,
            recipeName: recipe.recipeName,
            currentStep: recipe.instructions[0], // Simplified for example
        });

        setConversation([...newConversation, { role: 'assistant', content: res.answer }]);
        setLoading(false);
    };

    return (
        <Card className="flex flex-col h-[600px]">
            <CardHeader>
                <CardTitle>AI Cooking Assistant</CardTitle>
                <CardDescription>Ask questions and get tips as you cook.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <ScrollArea className="flex-grow pr-4 -mr-4 mb-4">
                    <div className="space-y-4">
                        {conversation.map((msg, i) => (
                           <div key={i} className={cn("flex items-start gap-3", msg.role === 'user' ? "justify-end" : "")}>
                                {msg.role === 'assistant' && <Avatar className="w-8 h-8"><AvatarFallback><Bot size={20}/></AvatarFallback></Avatar>}
                                <div className={cn("p-3 rounded-lg max-w-[80%]", msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                                {msg.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback><User size={20}/></AvatarFallback></Avatar>}
                           </div>
                        ))}
                         {loading &&  <div className="flex items-start gap-3"><Avatar className="w-8 h-8"><AvatarFallback><Bot size={20}/></AvatarFallback></Avatar><div className="p-3 rounded-lg bg-secondary"><Loader2 className="h-5 w-5 animate-spin" /></div></div>}
                    </div>
                </ScrollArea>
                <form onSubmit={handleAsk} className="flex gap-2">
                    <Input
                        placeholder="e.g., How can I substitute quinoa?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading}>
                        Ask
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export function ArCookingView({ recipe }: ArCookingViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <h2 className="text-2xl font-bold font-headline">Ready to Cook?</h2>
        <p className="text-muted-foreground mt-2">
          Enhance your cooking with our AI-powered augmented reality assistant.
        </p>
        <Button onClick={() => setIsOpen(true)} className="mt-4">
          Start AR Cooking Session
        </Button>
      </div>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-2xl font-bold font-headline">
                AR Cooking Session
                </CardTitle>
                <CardDescription>
                AI-powered guidance for: {recipe.recipeName}
                </CardDescription>
            </div>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="guidance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guidance">Adaptive Guidance</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredient Highlighter</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          <TabsContent value="guidance">
            <AdaptiveGuidance recipe={recipe} />
          </TabsContent>
          <TabsContent value="ingredients">
            <IngredientHighlighter recipe={recipe} />
          </TabsContent>
          <TabsContent value="assistant">
            <AiAssistant recipe={recipe} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
