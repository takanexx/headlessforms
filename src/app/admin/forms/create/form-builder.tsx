'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Session } from 'next-auth';
import { useState } from 'react';

export default function FormBuilder({ session }: { session: Session | null }) {
  const [title, setTitle] = useState('');
  const [schema, setSchema] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !session.user || !session.user.id) {
      alert('ログインしていません。');
      return;
    }

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          schema: JSON.stringify(schema),
          ownerId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('フォーム作成に失敗しました。');
      }
    } catch (error) {
      console.error(error);
      alert('フォームの作成に失敗しました。');
    }
  };

  return (
    <Card className="p-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid items-center grid-cols-6 gap-4">
          <Label
            htmlFor="formName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            フォームタイトル
          </Label>
          <Input
            id="formName"
            type="text"
            placeholder="例: お問い合わせフォーム"
            className="mt-1 block w-full col-span-5"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div className="flex gap-4 items-center">
            <Label
              htmlFor="formSchema"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              項目
            </Label>
            <Button
              size={'sm'}
              variant={'outline'}
              type="button"
              onClick={() => console.log('add')}
            >
              追加
            </Button>
          </div>
          <div className="mt-2 space-y-4">
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-1/4">
                  <SelectValue placeholder="項目の種類を選択" />
                </SelectTrigger>
                <SelectContent className="w-1/4">
                  <SelectItem value="text">テキスト</SelectItem>
                  <SelectItem value="email">メールアドレス</SelectItem>
                  <SelectItem value="number">数値</SelectItem>
                  <SelectItem value="date">日付</SelectItem>
                  <SelectItem value="select">選択肢</SelectItem>
                  <SelectItem value="checkbox">チェックボックス</SelectItem>
                  <SelectItem value="radio">ラジオボタン</SelectItem>
                  <SelectItem value="textarea">テキストエリア</SelectItem>
                </SelectContent>
              </Select>
              <Input type="text" className="mt-1 block w-full" />
              <Button variant="destructive" size="sm" type="button">
                削除
              </Button>
            </div>
          </div>
        </div>
        {session && session.user && (
          <Input id="ownerId" type="hidden" value={session.user.id} readOnly />
        )}
        <div className="flex justify-end pt-4">
          <Button type="submit">作成</Button>
        </div>
      </form>
    </Card>
  );
}
