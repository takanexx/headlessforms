import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r p-4 mt-18">
      <h2 className="text-lg font-bold mb-4 mt-2">Admin Menu</h2>
      <NavigationMenu>
        <NavigationMenuList className="flex-col gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/admin"
              className="p-2 rounded hover:bg-accent transition-colors"
            >
              ホーム
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/admin/forms"
              className="p-2 rounded hover:bg-accent transition-colors"
            >
              フォーム一覧
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/admin/sample"
              className="p-2 rounded hover:bg-accent transition-colors"
            >
              Sample
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/admin/other"
              className="p-2 rounded hover:bg-accent transition-colors"
            >
              その他
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}
