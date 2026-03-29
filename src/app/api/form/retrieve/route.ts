import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const { formId } = await request.json();
    const form = await prisma.form.findUnique({ where: { id: formId } });

    if (!form) {
      return NextResponse.json(
        { error: 'フォームが見つかりません。' },
        { status: 404 },
      );
    }

    if (form.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームデータの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
