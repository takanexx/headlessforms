import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const answer = await prisma.answer.findUnique({
      where: { id },
      include: {
        user: true,
        form: true,
      },
    });
    if (!answer) {
      return NextResponse.json(
        { error: '回答が見つかりません。' },
        { status: 404 },
      );
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
