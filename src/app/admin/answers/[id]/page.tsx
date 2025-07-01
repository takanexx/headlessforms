'use client';

import { Card } from '@/components/ui/card';
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
      } catch (e) {
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
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">回答詳細</h1>
        <div className="mb-2">
          <span className="font-semibold">回答ID：</span>
          {answer.id}
        </div>
        <div className="mb-2">
          <span className="font-semibold">フォーム名：</span>
          {answer.form?.title ?? '-'}
        </div>
        <div className="mb-2">
          <span className="font-semibold">回答者：</span>
          {answer.user?.name ?? answer.user?.email ?? '-'}
        </div>
        <div className="mb-2">
          <span className="font-semibold">回答日時：</span>
          {new Date(answer.createdAt).toLocaleString()}
        </div>
        <div className="mb-2">
          <span className="font-semibold">回答内容：</span>
          <ul className="list-disc ml-6">
            {answer.answers &&
              Object.entries(answer.answers).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}：</span>
                  {typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value)}
                </li>
              ))}
          </ul>
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
  );
}
