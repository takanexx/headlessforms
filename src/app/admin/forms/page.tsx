'use client';

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const dummyForms = [
  { id: 1, name: 'フォーム A', description: 'フォーム A の説明' },
  { id: 2, name: 'フォーム B', description: 'フォーム B の説明' },
  { id: 3, name: 'フォーム C', description: 'フォーム C の説明' },
];

export default function FormsPage() {
  return (
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* ヘッダー */}
      <Header />
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col">
        <div className="h-16"></div>
        {/* コンテンツ */}
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">フォーム一覧</h1>
            <Link href="/admin/forms/create">
              <Button>新規作成</Button>
            </Link>
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
