import { ClientSidebarProvider } from '@/components/client-sidebar-provider';
import { FirebaseProvider } from '@/firebase';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In a real app, you'd protect this layout
  // based on authentication status.
  return (
    <FirebaseProvider>
      <ClientSidebarProvider>{children}</ClientSidebarProvider>
    </FirebaseProvider>
  );
}
