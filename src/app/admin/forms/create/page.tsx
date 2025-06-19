'use client';

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateFormPage() {
  return (
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* ヘッダー */}
      <Header />
      {/* サイドバー */}
      <Sidebar />
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
