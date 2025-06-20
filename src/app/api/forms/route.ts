import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, schema, ownerId } = await request.json();

    // Create a new form record in the database
    const form = await prisma.form.create({
      data: {
        title,
        schema,
        ownerId,
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
