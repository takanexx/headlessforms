import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const answers = await prisma.answer.findMany({
      where: { userId },
      include: {
        form: {
          select: { title: true },
        },
      },
    });
    return NextResponse.json(
      answers.map(a => ({
        ...a,
        formTitle: a.form?.title ?? '',
      })),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '回答リストの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
