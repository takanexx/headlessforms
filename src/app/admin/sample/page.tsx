import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Card } from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function SampleAdminPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* サイドバー */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-muted p-4">
        <h2 className="text-lg font-bold mb-4">ドキュメント</h2>
        <NavigationMenu>
          <NavigationMenuList className="flex-col gap-2">
            <NavigationMenuItem>
              <Link href="/admin/sample" passHref legacyBehavior>
                <NavigationMenuLink className="p-2 rounded hover:bg-accent transition-colors">
                  はじめに
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/admin/sample/usage" passHref legacyBehavior>
                <NavigationMenuLink className="p-2 rounded hover:bg-accent transition-colors">
                  使い方
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/admin/sample/api" passHref legacyBehavior>
                <NavigationMenuLink className="p-2 rounded hover:bg-accent transition-colors">
                  APIリファレンス
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <header className="w-full border-b bg-background px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/next.svg" alt="Next.js" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Sample ドキュメント</h1>
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
        <div className="flex-1 p-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">はじめに</h2>
            <Separator className="mb-4" />
            <p>
              これはNext.js公式ドキュメントページ風のサンプル画面です。shadcn/uiのコンポーネントを活用して構築しています。
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-1">
              <li>サイドバーによるセクションナビゲーション</li>
              <li>レスポンシブ対応（md未満でサイドバー非表示）</li>
              <li>shadcn/uiのNavigationMenu, Card, Separator等を利用</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
