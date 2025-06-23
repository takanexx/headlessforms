import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronUp, DollarSign, LogOut, User2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { ThemeToggleButton } from '../theme-toggle-button';

export default function AdminSidebarFooter() {
  const { data: session, status } = useSession();
  const user = session?.user ?? { name: 'Username' };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger asChild className="">
                <SidebarMenuButton className="border py-4 dark:bg-input/30 bg-background ">
                  <User2 /> <span>{user.name}</span>
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
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
