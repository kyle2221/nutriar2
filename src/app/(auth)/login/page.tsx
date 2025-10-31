
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24"
    className="h-5 w-5"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { signUp, signIn, signInWithGoogle, isFirebaseReady } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          opacity: 0.1,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 md:px-6">
        <Link href="/dashboard" className="absolute top-6 left-6 flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl tracking-tight">NutriAR</span>
        </Link>
        {!isClient ? (
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        ) : (
          <Card className="w-full max-w-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline">
                {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </CardTitle>
              <CardDescription>
                {mode === 'login'
                  ? 'Sign in to access your personalized health plan.'
                  : 'Enter your details to get started.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isFirebaseReady && (
                <Alert variant="destructive">
                  <AlertTitle>Firebase Not Configured</AlertTitle>
                  <AlertDescription>
                    The application is not connected to Firebase. Authentication is disabled.
                  </AlertDescription>
                </Alert>
              )}
              {error && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-sm text-destructive">
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isFirebaseReady}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isFirebaseReady}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading || !isFirebaseReady}>
                  {loading ? <Loader2 className="animate-spin" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                className="w-full shadow-sm"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading || !isFirebaseReady}
              >
                <GoogleIcon />
                <span className="ml-2">
                  {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                </span>
              </Button>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} disabled={!isFirebaseReady}>
                {mode === 'login'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
