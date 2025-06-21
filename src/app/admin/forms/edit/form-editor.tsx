'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { Plus, Trash } from 'lucide-react';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function FormBuilder({
  session,
  form,
}: {
  session: Session | null;
  form?: { title: string; schema: { type: string; label: string }[] };
}) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [schema, setSchema] = useState<{ type: string; label: string }[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  if (!form) {
    // フォームが存在しない場合は、フォーム作成ページにリダイレクト
    // redirect('/admin/forms/create');
  }

  const handleAddItem = () => {
    setSchema(prev => [...prev, { type: '', label: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !session.user || !session.user.id) {
      setError('not_logged_in');
      setAlertMessage('ログインしていません。ログインしてください。');
      setAlertOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/form/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          schema: JSON.stringify(schema),
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('フォーム作成に失敗しました。');
      }

      // フォーム一覧画面へリダイレクト
      redirect('/admin/forms');
    } catch (error) {
      console.error(error);
      setAlertMessage('フォームの作成に失敗しました。');
      setAlertOpen(true);
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
              size="sm"
              variant="outline"
              type="button"
              onClick={handleAddItem}
            >
              <Plus />
            </Button>
          </div>
          <div className="mt-2 space-y-4">
            {schema.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <Select
                  value={item.type}
                  onValueChange={value => {
                    const newSchema = [...schema];
                    newSchema[index].type = value;
                    setSchema(newSchema);
                  }}
                >
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
                <Input
                  type="text"
                  placeholder="項目名を入力"
                  className="mt-1 block w-full"
                  value={item.label}
                  onChange={e => {
                    const newSchema = [...schema];
                    newSchema[index].label = e.target.value;
                    setSchema(newSchema);
                  }}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() =>
                    setSchema(schema.filter((_, i) => i !== index))
                  }
                >
                  <Trash />
                </Button>
              </div>
            ))}
          </div>
        </div>
        {session && session.user && (
          <Input id="ownerId" type="hidden" value={session.user.id} readOnly />
        )}
        <div className="flex justify-end pt-4">
          <Button type="submit">作成</Button>
        </div>
      </form>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>エラー</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                if (error === 'not_logged_in') {
                  // ログイン画面にリダイレクト
                  redirect('/admin');
                }
                setAlertMessage('');
                setAlertOpen(false);
              }}
            >
              OK
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
