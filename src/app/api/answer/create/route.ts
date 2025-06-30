import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const plan = (session?.user?.plan || 'Free').toLowerCase();

    if (!userId) {
      return NextResponse.json(
        { error: 'ユーザー情報が取得できません。ログインし直してください。' },
        { status: 401 },
      );
    }

    const { schema: answers, formId } = await request.json();

    // 今月の開始・終了日時を計算
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    // 今月の回答数を取得
    const count = await prisma.answer.count({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    // プランごとの上限
    const planLimit: Record<string, number> = {
      free: 100,
      pro: 1000,
      business: Infinity,
    };
    const limit = planLimit[plan] ?? 100;

    if (limit !== Infinity && count >= limit) {
      return NextResponse.json(
        { error: `このプランでは今月の回答上限（${limit}件）に達しています。` },
        { status: 403 },
      );
    }

    // フォームのschema情報を取得
    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) {
      return NextResponse.json(
        { error: '該当するフォームが見つかりません。' },
        { status: 404 },
      );
    }
    const formSchema = form.schema as Array<{ type: string; label: string }>;

    // バリデーション
    const errors: string[] = [];
    for (const item of formSchema) {
      const value = answers[item.label];
      if (value === undefined || value === null || value === '') {
        errors.push(`「${item.label}」は必須です。`);
        continue;
      }
      switch (item.type) {
        case 'email':
          if (
            typeof value !== 'string' ||
            !/^[\w\-.]+@[\w\-.]+\.[a-zA-Z]{2,}$/.test(value)
          ) {
            errors.push(
              `「${item.label}」は有効なメールアドレスを入力してください。`,
            );
          }
          break;
        case 'number':
          if (isNaN(Number(value))) {
            errors.push(`「${item.label}」は数値で入力してください。`);
          }
          break;
        case 'date':
          if (typeof value !== 'string' || isNaN(Date.parse(value))) {
            errors.push(`「${item.label}」は有効な日付を入力してください。`);
          }
          break;
        case 'checkbox':
          if (typeof value !== 'boolean' && !Array.isArray(value)) {
            errors.push(
              `「${item.label}」はチェックボックス形式で入力してください。`,
            );
          }
          break;
        default:
          // text, select, radio, textarea など
          if (typeof value !== 'string') {
            errors.push(`「${item.label}」は文字列で入力してください。`);
          }
      }
    }
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: errors },
        { status: 400 },
      );
    }

    // Create a new answer record in the database
    const answer = await prisma.answer.create({
      data: {
        formId,
        userId,
        answers,
      },
    });

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォーム作成に失敗しました。' },
      { status: 500 },
    );
  }
}
