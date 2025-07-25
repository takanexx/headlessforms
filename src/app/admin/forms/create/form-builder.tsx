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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

type FormSchemaItem = {
  type: string;
  name: string;
  label: string;
};

type FormBuilderValues = {
  title: string;
  schema: FormSchemaItem[];
};

export default function FormBuilder({ session }: { session: Session | null }) {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState('');

  const methods = useForm<FormBuilderValues>({
    defaultValues: {
      title: '',
      schema: [],
    },
    mode: 'onBlur',
  });

  const { control, handleSubmit, setError: setFormError } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schema',
  });

  const onSubmit = async (data: FormBuilderValues) => {
    if (!session || !session.user || !session.user.id) {
      setError('not_logged_in');
      setAlertMessage('ログインしていません。ログインしてください。');
      setAlertOpen(true);
      return;
    }
    if (data.title.trim() === '') {
      setFormError('title' as keyof FormBuilderValues, {
        type: 'required',
        message: 'タイトルを入力してください。',
      });
      return;
    }
    if (data.schema.length === 0) {
      setAlertMessage('項目を1つ以上追加してください。');
      setAlertOpen(true);
      return;
    }
    for (let i = 0; i < data.schema.length; i++) {
      if (!data.schema[i].type) {
        setFormError(`schema.${i}.type` as keyof FormBuilderValues, {
          type: 'required',
          message: '項目の種類を選択してください。',
        });
        return;
      }
      if (!data.schema[i].name) {
        setFormError(`schema.${i}.name` as keyof FormBuilderValues, {
          type: 'required',
          message: 'name値を入力してください。',
        });
        return;
      }
      if (!data.schema[i].label) {
        setFormError(`schema.${i}.label` as keyof FormBuilderValues, {
          type: 'required',
          message: '項目名を入力してください。',
        });
        return;
      }
    }

    try {
      const response = await fetch('/api/form/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          schema: data.schema,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(errorData?.error || 'フォーム作成に失敗しました。');
        setAlertOpen(true);
        return;
      }

      // フォーム一覧画面へリダイレクト
      if (typeof window !== 'undefined') {
        // リダイレクト先でtoasterを表示するためにsessionStorageにフラグをセット
        sessionStorage.setItem('formCreated', '1');
      }
      router.push('/admin/forms');
    } catch (error: unknown) {
      console.error(error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        setAlertMessage((error as { message: string }).message);
      } else {
        setAlertMessage('フォームの作成に失敗しました。');
      }
      setAlertOpen(true);
    }
  };

  return (
    <Card className="p-6">
      <FormProvider {...methods}>
        <Form {...methods}>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="title"
              control={control}
              rules={{ required: 'タイトルを入力してください。' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>フォームタイトル</FormLabel>
                  <FormControl>
                    <Input
                      id="formName"
                      type="text"
                      placeholder="例: お問い合わせフォーム"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="flex gap-4 items-center">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  項目
                </Label>
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => append({ type: '', name: '', label: '' })}
                >
                  <Plus />
                </Button>
              </div>
              <div className="mt-2 space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <FormField
                      name={`schema.${index}.type`}
                      control={control}
                      rules={{ required: '項目の種類を選択してください。' }}
                      render={({ field: typeField }) => (
                        <FormItem className="w-1/4">
                          <FormLabel>種類</FormLabel>
                          <FormControl>
                            <Select
                              value={typeField.value}
                              onValueChange={typeField.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="項目の種類を選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">テキスト</SelectItem>
                                <SelectItem value="email">
                                  メールアドレス
                                </SelectItem>
                                <SelectItem value="number">数値</SelectItem>
                                <SelectItem value="date">日付</SelectItem>
                                <SelectItem value="select">選択肢</SelectItem>
                                <SelectItem value="checkbox">
                                  チェックボックス
                                </SelectItem>
                                <SelectItem value="radio">
                                  ラジオボタン
                                </SelectItem>
                                <SelectItem value="textarea">
                                  テキストエリア
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`schema.${index}.label`}
                      control={control}
                      rules={{ required: '項目名を入力してください。' }}
                      render={({ field: labelField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>項目名</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="項目名を入力"
                              {...labelField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`schema.${index}.name`}
                      control={control}
                      rules={{ required: 'name属性を入力してください。' }}
                      render={({ field: nameField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>name属性</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="name属性を入力"
                              {...nameField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            {session && session.user && (
              <Input
                id="ownerId"
                type="hidden"
                value={session.user.id}
                readOnly
              />
            )}
            <div className="flex justify-end pt-4">
              <Button type="submit">作成</Button>
            </div>
          </form>
        </Form>
      </FormProvider>
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
                  router.push('/admin');
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
