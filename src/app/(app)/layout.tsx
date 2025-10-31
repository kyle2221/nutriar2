import { ClientSidebarProvider } from '@/components/client-sidebar-provider';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In a real app, you'd protect this layout
  // based on authentication status.
  return <ClientSidebarProvider>{children}</ClientSidebarProvider>;
}
