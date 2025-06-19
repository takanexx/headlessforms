'use client';

import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const dummyForms = [
  { id: 1, name: 'フォーム A', description: 'フォーム A の説明' },
  { id: 2, name: 'フォーム B', description: 'フォーム B の説明' },
  { id: 3, name: 'フォーム C', description: 'フォーム C の説明' },
];

export default function FormsPage() {
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
        {/* コンテンツ */}
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">フォーム一覧</h1>
            <Button>新規作成</Button>
          </div>
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>説明</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyForms.map(form => (
                  <TableRow key={form.id}>
                    <TableCell>{form.id}</TableCell>
                    <TableCell>{form.name}</TableCell>
                    <TableCell>{form.description}</TableCell>
                    <TableCell>
                      <Button variant="outline">詳細を見る</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  );
}
