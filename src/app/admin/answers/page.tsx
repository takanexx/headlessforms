'use client';

import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Toaster } from '@/components/ui/sonner';
import { useEffect, useState } from 'react';
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

  const columns = getColumns();

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
