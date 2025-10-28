'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export function ClientSidebarProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Do not render sidebar on the landing page
    if (pathname === '/') {
        return <>{children}</>;
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <AppSidebar />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
