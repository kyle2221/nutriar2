
'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Users,
  Settings,
  Leaf,
  Scan,
  DollarSign,
  LogIn
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recipes', label: 'Recipes', icon: BookOpen },
  { href: '/meal-plan', label: 'Meal Plan', icon: CalendarCheck },
  { href: '/pantry-pal', label: 'Pantry Pal', icon: Scan },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/pricing', label: 'Pricing', icon: DollarSign },
];

export function AppSidebar() {
  const pathname = usePathname();
  // Placeholder for authentication status
  const isAuthenticated = false; 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <>
      <SidebarHeader>
        <Link href="/" className='w-full'>
            <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-sidebar-primary hover:bg-sidebar-accent">
                <Leaf className="h-6 w-6" />
            </Button>
            <div className="flex flex-col">
                <span className="font-semibold tracking-tight font-headline text-sidebar-foreground">
                NutriAR
                </span>
            </div>
            </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="text-sidebar-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {isMounted && (
        <SidebarFooter className="p-2">
            <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/settings">
                    <SidebarMenuButton tooltip="Settings" isActive={pathname === '/settings'} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                {isAuthenticated ? (
                    <div className="flex items-center gap-2 p-2 rounded-md">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-sm">
                            <span className="font-semibold text-sidebar-foreground">User</span>
                            <span className="text-sidebar-foreground/70">user@email.com</span>
                        </div>
                    </div>
                ) : (
                    <Link href="/login" className="w-full">
                        <SidebarMenuButton tooltip="Login" className="w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <LogIn />
                            <span>Login</span>
                        </SidebarMenuButton>
                    </Link>
                )}
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      )}
    </>
  );
}
