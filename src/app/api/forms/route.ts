import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const forms = await prisma.form.findMany();
    return NextResponse.json(forms);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームの取得に失敗しました。' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, schema, userId } = await request.json();

    // Create a new form record in the database
    const form = await prisma.form.create({
      data: {
        title,
        schema,
        userId,
      },
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォーム作成に失敗しました。' },
      { status: 500 },
    );
  }
}
