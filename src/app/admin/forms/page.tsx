'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { Toaster } from '@/components/ui/sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ellipsis, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Form {
  id: string;
  title: string;
  createdAt: string;
}

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    async function fetchForms() {
      try {
        const res = await fetch('/api/form/list');
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

  const handleDelete = async (formId: string) => {
    try {
      const res = await fetch('/api/form/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formId }),
      });
      if (res.ok) {
        toast.success('フォームを削除しました。');
        setForms(forms.filter(form => form.id !== formId));
      } else {
        toast.error('フォームの削除に失敗しました。');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('エラーが発生しました。');
      }
    }
  };

  return (
    <div className="flex bg-background dark:bg-background">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        {/* コンテンツ */}
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">フォーム一覧</h1>
            <Link href="/admin/forms/create">
              <Button>
                <Plus />
                新規作成
              </Button>
            </Link>
          </div>
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.length > 0 ? (
                  forms.map(form => (
                    <TableRow key={form.id}>
                      <TableCell>{form.id}</TableCell>
                      <TableCell>{form.title}</TableCell>
                      <TableCell>
                        {new Date(form.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              <Ellipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-20">
                            <DropdownMenuItem
                              onClick={() =>
                                redirect(`/admin/forms/edit/${form.id}`)
                              }
                            >
                              編集
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(form.id)}
                            >
                              削除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center py-5" colSpan={4}>
                      フォームデータはありません
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Toaster />
          </Card>
          <div className="mt-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
