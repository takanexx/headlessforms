import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ヒーローセクション */}
      <header className="w-full py-16 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black relative">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          HeadlessForms
        </h1>
        <div className="text-lg sm:text-xl text-center max-w-xl my-10">
          <p className="">UI/UXは完全に自由。</p>
          <p className="">アンケート設計・収集・分析APIプラットフォーム</p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button asChild>
            <Link href="/login">今すぐ始める</Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a
              href="https://example.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              ドキュメント
            </a>
          </Button>
        </div>
      </header>

      {/* 特徴セクション */}
      <section className="w-full max-w-4xl mx-auto mt-16 px-4 grid gap-8 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>UI/UXは完全自由</CardTitle>
          </CardHeader>
          <CardContent>
            開発者が思い通りのUI/UXを実装可能。フロントは完全にカスタマイズできます。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>APIで一気通貫</CardTitle>
          </CardHeader>
          <CardContent>
            アンケート設計〜回答収集〜分析まで、全てAPIで完結します。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>柔軟なJSONスキーマ</CardTitle>
          </CardHeader>
          <CardContent>
            シンプルかつ柔軟なJSONスキーマでフォーム構造とロジックを定義できます。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>マルチプラットフォームSDK</CardTitle>
          </CardHeader>
          <CardContent>
            iOS/Android/Web対応の軽量SDKも順次提供予定です。
          </CardContent>
        </Card>
      </section>

      {/* 使い方イメージ */}
      <section className="w-full max-w-3xl mx-auto mt-20 px-4">
        <h2 className="text-2xl font-semibold mb-6">使い方イメージ</h2>
        <Tabs defaultValue="json" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="json">JSONスキーマ例</TabsTrigger>
            <TabsTrigger value="api">API利用例</TabsTrigger>
            <TabsTrigger value="sdk">SDK利用例</TabsTrigger>
          </TabsList>
          <TabsContent value="json">
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {`{
  "title": "アンケートタイトル",
  "fields": [
    { "type": "text", "label": "お名前" },
    { "type": "radio", "label": "性別", "options": ["男性", "女性", "その他"] }
  ]
}`}
            </pre>
          </TabsContent>
          <TabsContent value="api">
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {`POST /api/forms
{
  "title": "アンケートタイトル",
  "fields": [...]
}`}
            </pre>
          </TabsContent>
          <TabsContent value="sdk">
            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {`import { createForm } from 'headlessforms-sdk';

createForm({
  title: "アンケートタイトル",
  fields: [...]
});`}
            </pre>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA */}
      <section className="w-full flex justify-center mt-16 mb-8">
        <Button size="lg" asChild>
          <Link href="/admin">今すぐはじめる</Link>
        </Button>
      </section>

      {/* フッター */}
      <footer className="w-full py-6 border-t text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} HeadlessForms. All rights reserved.
      </footer>
    </div>
  );
}
