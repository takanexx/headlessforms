'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileText, Home, Megaphone } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import AdminSidebarFooter from './sidebar-footer';

export default function AdminSidebar() {
  const menus = [
    {
      title: 'Home',
      url: '/admin',
      icon: Home,
    },
    {
      title: 'Form',
      url: '/admin/forms',
      icon: FileText,
    },
    {
      title: 'Answer',
      url: '/admin/answers',
      icon: Megaphone,
    },
  ];

  return (
    <SessionProvider>
      <Sidebar className="">
        <SidebarHeader className="p-4">
          <div>
            <img src="/next.svg" alt="Next.js" className="h-10 w-30" />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu>
            {menus.map((menu, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link href={menu.url} className="sidebar-item">
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <AdminSidebarFooter />
      </Sidebar>
    </SessionProvider>
  );
}
