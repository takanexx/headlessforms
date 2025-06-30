import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, schema, userId } = await request.json();

    // ユーザー情報と現在のフォーム数を取得
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません。' },
        { status: 404 },
      );
    }

    const formCount = await prisma.form.count({ where: { userId } });
    const plan = (user.plan ?? 'free').toLowerCase();

    const planLimits: Record<string, number> = {
      free: 3,
      pro: 10,
      business: Infinity,
    };
    const limit = planLimits[plan] ?? 3;

    if (formCount >= limit) {
      return NextResponse.json(
        { error: 'ご契約プランで作成できるフォーム数の上限に達しています。' },
        { status: 400 },
      );
    }

    // Create a new form record in the database
    const form = await prisma.form.create({
      data: {
        title,
        schema,
        userId,
      },
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォーム作成に失敗しました。' },
      { status: 500 },
    );
  }
}
