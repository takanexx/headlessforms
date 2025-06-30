import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const answers = await prisma.answer.findMany();
    return NextResponse.json(answers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '回答リストの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
