import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const answers = await prisma.answer.findMany({
      include: {
        form: {
          select: {
            title: true,
          },
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
