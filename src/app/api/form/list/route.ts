import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const forms = await prisma.form.findMany();
    return NextResponse.json(forms);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームリストの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
