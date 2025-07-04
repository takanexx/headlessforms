'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Toaster } from '@/components/ui/sonner';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Answer, getColumns } from './columns';
import { DataTable } from './data-table';

export default function AnswersPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [idSearch, setIdSearch] = useState('');
  const [dateSearch, setDateSearch] = useState<Date | undefined>(undefined);
  const [formSearch, setFormSearch] = useState('');

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

  const filteredAnswers = answers.filter(a => {
    const idMatch = a.id.includes(idSearch);
    const formMatch = a.formTitle.includes(formSearch);
    let dateMatch = true;
    if (dateSearch) {
      const answerDate = new Date(a.createdAt);
      dateMatch =
        answerDate.getFullYear() === dateSearch.getFullYear() &&
        answerDate.getMonth() === dateSearch.getMonth() &&
        answerDate.getDate() === dateSearch.getDate();
    }
    return idMatch && dateMatch && formMatch;
  });

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="my-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">回答一覧</h1>
          </div>
          <Card className="p-4 mb-6 flex flex-col gap-2 md:flex-row md:gap-4">
            <Input
              value={idSearch}
              onChange={e => setIdSearch(e.target.value)}
              placeholder="IDで検索"
              className="max-w-xs"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="max-w-xs w-full justify-start text-left font-normal"
                >
                  {dateSearch
                    ? format(dateSearch, 'yyyy/MM/dd', { locale: ja })
                    : '日付を選択'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateSearch}
                  onSelect={setDateSearch}
                  locale={ja}
                  initialFocus
                />
                <Button
                  variant="ghost"
                  className="mt-2 w-full"
                  onClick={() => setDateSearch(undefined)}
                >
                  クリア
                </Button>
              </PopoverContent>
            </Popover>
            <Input
              value={formSearch}
              onChange={e => setFormSearch(e.target.value)}
              placeholder="フォーム名で検索"
              className="max-w-xs"
            />
          </Card>
          <Card className="p-4">
            <DataTable columns={columns} data={filteredAnswers} />
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
