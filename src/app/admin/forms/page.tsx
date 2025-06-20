'use client';

import Header from '@/components/admin/navigation-header';
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
import { useEffect, useState } from 'react';

interface Form {
  id: number;
  title: string;
  createdAt: string;
}

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    async function fetchForms() {
      try {
        const res = await fetch('/api/forms');
        if (res.ok) {
          const data = await res.json();
          setForms(data);
        } else {
          console.error('フォームの取得に失敗しました。');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchForms();
  }, []);

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
                  <TableHead>作成日時</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map(form => (
                  <TableRow key={form.id}>
                    <TableCell>{form.id}</TableCell>
                    <TableCell>{form.title}</TableCell>
                    <TableCell>
                      {new Date(form.createdAt).toLocaleString()}
                    </TableCell>
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
