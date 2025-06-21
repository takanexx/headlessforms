'use client';

import { ThemeToggleButton } from '@/components/theme-toggle-button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileText, Home, Megaphone } from 'lucide-react';
import Link from 'next/link';

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
    <Sidebar>
      <SidebarHeader className="px-4">
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

        {/* <SidebarGroup>
          <SidebarGroupLabel>Forms</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/forms" className="sidebar-item">
                    <ListOrdered />
                    <span>Lists</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/forms/create" className="sidebar-item">
                    Create
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="justify-between flex items-center p-2">
            <span>User Name</span>
            <SidebarMenuButton asChild>
              <ThemeToggleButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
