import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id, title, schema, userId } = await request.json();
    console.log(id, title, schema, userId);
    const form = await prisma.form.findUnique({
      where: {
        id: id,
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: 'フォームが見つかりません。' },
        { status: 404 },
      );
    }

    if (form.userId !== userId) {
      return NextResponse.json(
        { error: '権限がありません。' },
        { status: 403 },
      );
    }

    const updatedForm = await prisma.form.update({
      where: {
        id: id,
      },
      data: {
        title,
        schema,
      },
    });

    return NextResponse.json(updatedForm, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームデータの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
