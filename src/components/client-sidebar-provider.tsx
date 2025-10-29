'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { useState, useEffect } from 'react';

export function ClientSidebarProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Render a consistent layout on the server to avoid hydration errors
        return (
            <SidebarProvider>
                <Sidebar>
                    <AppSidebar />
                </Sidebar>
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        );
    }
    
    const isGetStartedPage = pathname === '/';

    // Render only the children on the get-started page
    if (isGetStartedPage) {
        return <>{children}</>;
    }

    // Render the sidebar layout for all other pages
    return (
        <SidebarProvider>
            <Sidebar>
                <AppSidebar />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
