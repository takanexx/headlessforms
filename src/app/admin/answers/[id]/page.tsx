'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnswerCard from './answer-card';

export type AnswerDetail = {
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
    <div className="flex flex-col bg-background dark:bg-background">
      <div className="flex flex-row items-center w-full p-4 pb-0">
        <SidebarTrigger />
        <div className="pl-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/answers">Answer</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">回答詳細</h1>
          <AnswerCard answer={answer} />
        </div>
      </div>
    </div>
  );
}
