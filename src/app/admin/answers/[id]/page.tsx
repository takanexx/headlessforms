'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type AnswerDetail = {
  id: string;
  answers: Record<string, unknown>;
  meta?: Record<string, unknown> | null;
  createdAt: string;
  user: {
    id: string;
    name?: string | null;
    email: string;
  };
  form: {
    id: string;
    title: string;
  };
};

export default function AnswerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [answer, setAnswer] = useState<AnswerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnswer() {
      try {
        const res = await fetch(`/api/answer/${id}`);
        if (!res.ok) {
          setError('回答詳細の取得に失敗しました。');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAnswer(data);
      } catch {
        setError('通信エラーが発生しました。');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAnswer();
  }, [id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (!answer) {
    return <div>データが見つかりません。</div>;
  }

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">回答詳細</h1>
          <Card className="p-6">
            <div className="grid gap-y-6">
              <div className="grid grid-cols-6 gap-x-4">
                <p className="font-semibold">フォーム名</p>
                <p className="col-span-5">{answer.form?.title ?? '-'}</p>
              </div>
              <div className="grid grid-cols-6 gap-x-4">
                <p className="font-semibold">回答ID</p>
                <p className="col-span-5">{answer.id}</p>
              </div>

              <div className="grid grid-cols-6 gap-x-4">
                <p className="font-semibold">回答日時</p>
                <p className="col-span-5">
                  {new Date(answer.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="grid gap-y-4">
                <p className="font-semibold">回答内容</p>
                <div className="rounded-md border">
                  <Table className="">
                    <TableHeader className="bg-muted">
                      <TableRow className="">
                        <TableHead className="font-semibold">項目名</TableHead>
                        <TableHead className="font-semibold">回答</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {answer.answers &&
                        Object.entries(answer.answers).map(([key, value]) => (
                          <TableRow key={key}>
                            <TableHead>{key}</TableHead>
                            <TableCell>
                              {typeof value === 'object'
                                ? JSON.stringify(value)
                                : String(value)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            {answer.meta && (
              <div className="mb-2">
                <span className="font-semibold">メタ情報：</span>
                <pre className="bg-gray-100 p-2 rounded text-xs">
                  {JSON.stringify(answer.meta, null, 2)}
                </pre>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
