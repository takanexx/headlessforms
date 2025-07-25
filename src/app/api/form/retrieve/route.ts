import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { formId } = await request.json();
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームデータの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
