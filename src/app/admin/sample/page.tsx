import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/sidebar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SampleAdminPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* ヘッダー */}
      <Header />
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col">
        <div className="h-16"></div>
        <div className="flex-1 p-6">
          <Card className="p-6">
            <h1 className="text-xl font-semibold mb-2">はじめに</h1>
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
