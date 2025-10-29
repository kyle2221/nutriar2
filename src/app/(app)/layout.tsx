import { ClientSidebarProvider } from '@/components/client-sidebar-provider';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientSidebarProvider>{children}</ClientSidebarProvider>;
}
