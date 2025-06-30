'use client';

import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Answer, getColumns } from './columns';
import { DataTable } from './data-table';

export default function AnswersPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const res = await fetch('/api/answer/list');
        if (res.ok) {
          const data = await res.json();
          setAnswers(data);
        } else {
          console.error('回答の取得に失敗しました。');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchAnswers();
  }, []);

  const handleDelete = async (answerId: string) => {
    try {
      const res = await fetch('/api/answer/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answerId }),
      });
      if (res.ok) {
        toast.success('回答を削除しました。');
        setAnswers(answers.filter(answer => answer.id !== answerId));
      } else {
        toast.error('回答の削除に失敗しました。');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('エラーが発生しました。');
      }
    }
  };

  const columns = getColumns(handleDelete);

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">回答一覧</h1>
          </div>
          <Card className="p-4">
            <DataTable columns={columns} data={answers} />
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
