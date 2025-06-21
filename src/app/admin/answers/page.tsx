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
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Answer {
  id: string;
  respondent: string;
  createdAt: string;
}

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

  return (
    <div className="flex bg-background dark:bg-background">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        {/* コンテンツ */}
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">回答一覧</h1>
            <Link href="/admin/answers/create">
              <Button>
                <Eye />
                詳細を見る
              </Button>
            </Link>
          </div>
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>回答者</TableHead>
                  <TableHead>回答日時</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {answers.length > 0 ? (
                  answers.map(answer => (
                    <TableRow key={answer.id}>
                      <TableCell>{answer.id}</TableCell>
                      <TableCell>{answer.respondent}</TableCell>
                      <TableCell>
                        {new Date(answer.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              <Trash2 />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-20">
                            <DropdownMenuItem
                              onClick={() =>
                                redirect(`/admin/answers/${answer.id}`)
                              }
                            >
                              詳細
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(answer.id)}
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
                      回答データはありません
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
