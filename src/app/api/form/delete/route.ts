import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { formId } = await request.json(); // formId: string[]
    console.log('formId:', formId);
    if (!Array.isArray(formId) || formId.length === 0) {
      return NextResponse.json(
        { error: '削除対象のフォームIDが指定されていません。' },
        { status: 400 },
      );
    }

    await prisma.$transaction([
      prisma.answer.deleteMany({ where: { formId: { in: formId } } }),
      prisma.form.deleteMany({ where: { id: { in: formId } } }),
    ]);

    return NextResponse.json({ deleted: formId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームデータの削除に失敗しました。' },
      { status: 500 },
    );
  }
}
