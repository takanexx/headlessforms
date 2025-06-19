'use client';

import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function CreateFormPage() {
  return (
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full border-b bg-background dark:bg-background px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img src="/next.svg" alt="Next.js" className="h-8 w-8" />
        </div>
        <nav className="flex items-center gap-2">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Docs
          </a>
          <ThemeToggleButton />
        </nav>
      </header>
      {/* サイドバー */}
      <aside className="hidden md:flex flex-col w-64 border-r p-4 mt-18">
        <h2 className="text-lg font-bold mb-4 mt-2">管理メニュー</h2>
        <NavigationMenu>
          <NavigationMenuList className="flex-col gap-2">
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
                href="/admin/other"
                className="p-2 rounded hover:bg-accent transition-colors"
              >
                その他
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col">
        <div className="h-16"></div>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">フォーム作成</h1>
          <Card className="p-6">
            <form className="space-y-4">
              <div>
                <Label
                  htmlFor="formName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  フォーム名
                </Label>
                <Input
                  id="formName"
                  type="text"
                  placeholder="例: お問い合わせフォーム"
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="formDescription"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  説明
                </Label>
                <Input
                  id="formDescription"
                  type="text"
                  placeholder="フォームの説明"
                  className="mt-1 block w-full"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">作成</Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
