import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const { id } = await params;
  try {
    const answer = await prisma.answer.findUnique({
      where: { id },
      include: { form: true },
    });
    if (!answer) {
      return NextResponse.json(
        { error: '回答が見つかりません。' },
        { status: 404 },
      );
    }
    if (answer.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(answer);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '回答詳細の取得に失敗しました。' },
      { status: 500 },
    );
  }
}
