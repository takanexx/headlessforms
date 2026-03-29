import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getPlanFormLimit } from '@/utils/plans';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const { title, schema } = await request.json();

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません。' },
        { status: 404 },
      );
    }

    const formCount = await prisma.form.count({ where: { userId } });
    const limit = getPlanFormLimit(user.plan ?? 'free');

    if (formCount >= limit) {
      return NextResponse.json(
        { error: 'ご契約プランで作成できるフォーム数の上限に達しています。' },
        { status: 400 },
      );
    }

    const form = await prisma.form.create({
      data: { title, schema, userId },
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
