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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { format, isAfter, isBefore, isEqual } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Answer, getColumns } from './columns';
import { DataTable } from './data-table';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function AnswersPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [idSearch, setIdSearch] = useState('');
  const [dateSearch, setDateSearch] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [formSearch, setFormSearch] = useState('all');
  const formTitles = Array.from(new Set(answers.map(a => a.formTitle))).filter(
    Boolean,
  );

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
    const formMatch = formSearch === 'all' || a.formTitle === formSearch;
    let dateMatch = true;
    if (dateSearch.from || dateSearch.to) {
      const answerDate = new Date(a.createdAt);
      if (dateSearch.from && dateSearch.to) {
        dateMatch =
          (isAfter(answerDate, dateSearch.from) ||
            isEqual(answerDate, dateSearch.from)) &&
          (isBefore(answerDate, dateSearch.to) ||
            isEqual(answerDate, dateSearch.to));
      } else if (dateSearch.from) {
        dateMatch =
          isAfter(answerDate, dateSearch.from) ||
          isEqual(answerDate, dateSearch.from);
      } else if (dateSearch.to) {
        dateMatch =
          isBefore(answerDate, dateSearch.to) ||
          isEqual(answerDate, dateSearch.to);
      }
    }
    return idMatch && dateMatch && formMatch;
  });

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
                <BreadcrumbPage>Answer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
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
                  id="date-range-picker"
                  variant="outline"
                  className="max-w-xs w-full justify-start text-left font-normal"
                >
                  {dateSearch.from && dateSearch.to
                    ? `${format(dateSearch.from, 'yyyy/MM/dd', { locale: ja })} 〜 ${format(dateSearch.to, 'yyyy/MM/dd', { locale: ja })}`
                    : dateSearch.from
                      ? `${format(dateSearch.from, 'yyyy/MM/dd', { locale: ja })} 〜`
                      : dateSearch.to
                        ? `〜 ${format(dateSearch.to, 'yyyy/MM/dd', { locale: ja })}`
                        : '日付範囲を選択'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateSearch}
                  onSelect={range =>
                    setDateSearch(range ?? { from: undefined, to: undefined })
                  }
                  numberOfMonths={2}
                  locale={ja}
                  initialFocus
                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setDateSearch({ from: undefined, to: undefined })
                    }
                  >
                    クリア
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Select value={formSearch} onValueChange={setFormSearch}>
              <SelectTrigger className="max-w-xs w-full">
                <SelectValue placeholder="フォーム名で絞り込み" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {formTitles.map(title => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
