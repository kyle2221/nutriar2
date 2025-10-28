'use client';

import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export function ClientSidebarProvider({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar>
                <AppSidebar />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
