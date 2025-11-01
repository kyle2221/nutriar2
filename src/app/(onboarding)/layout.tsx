import { FirebaseProvider } from '@/firebase';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FirebaseProvider>{children}</FirebaseProvider>;
}
