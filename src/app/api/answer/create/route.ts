import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { schema, formId } = await request.json();

    // Create a new form record in the database
    const answer = await prisma.answer.create({
      data: {
        formId,
        answers: schema,
      },
    });

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォーム作成に失敗しました。' },
      { status: 500 },
    );
  }
}
