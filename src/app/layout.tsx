import type { Metadata } from 'next';
import './globals.css';
import { ClientSidebarProvider } from '@/components/client-sidebar-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'NutriAR',
  description: 'Your AI-powered AR cooking and nutrition assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ClientSidebarProvider>
          {children}
        </ClientSidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
