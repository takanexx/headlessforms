'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  ChevronUp,
  DollarSign,
  FileText,
  Home,
  LogOut,
  Megaphone,
  User2,
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggleButton } from '../theme-toggle-button';

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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <div className="flex items-center">
                <DropdownMenuTrigger asChild className="">
                  <SidebarMenuButton className="border py-4 dark:bg-input/30 bg-background ">
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <ThemeToggleButton />
              </div>
              <DropdownMenuContent side="top" className="">
                <DropdownMenuItem>
                  <User2 />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DollarSign />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
