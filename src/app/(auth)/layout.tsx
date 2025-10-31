import { FirebaseProvider } from '@/firebase';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FirebaseProvider>{children}</FirebaseProvider>;
}