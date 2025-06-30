'use client';

import { Form, getColumns } from '@/app/admin/forms/columns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Toaster } from '@/components/ui/sonner';
import { RowSelectionState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from './data-table';

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    // フォーム作成成功時のトースト表示
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('formCreated')
    ) {
      toast.success('フォーム作成に成功しました。');
      sessionStorage.removeItem('formCreated');
    }

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

  // 一括削除
  const handleBulkDelete = async () => {
    const selectedIds = Object.keys(rowSelection).filter(
      key => rowSelection[key],
    );
    if (selectedIds.length === 0) return;

    try {
      const res = await fetch('/api/form/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formId: selectedIds }), // 複数ID対応APIならformId: selectedIds、単一ならループで送信
      });

      if (!res.ok) {
        throw new Error('フォームの削除に失敗しました。');
      }

      toast.success('選択したフォームを削除しました。');
      setForms(forms.filter(form => !selectedIds.includes(form.id)));
      setRowSelection({});
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('エラーが発生しました。');
      }
    }
  };

  const columns = getColumns();

  const selectedCount = Object.values(rowSelection).filter(Boolean).length;

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">フォーム一覧</h1>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={selectedCount === 0}>
                    削除{selectedCount > 0 ? `（${selectedCount}件）` : ''}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は取り消せません。選択したフォームが完全に削除されます。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleBulkDelete}
                      disabled={selectedCount === 0}
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link href="/admin/forms/create">
                <Button>
                  <Plus />
                  新規作成
                </Button>
              </Link>
            </div>
          </div>
          <Card className="p-4">
            <DataTable
              columns={columns}
              data={forms}
              rowSelection={rowSelection}
              onRowSelectionChange={setRowSelection}
            />
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
