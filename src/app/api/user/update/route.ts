import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { plan, userId } = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません。' },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plan,
      },
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'ユーザーデータの更新に失敗しました。' },
      { status: 500 },
    );
  }
}
