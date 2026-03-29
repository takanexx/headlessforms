import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const VALID_PLANS = ['free', 'pro', 'business'];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const { plan } = await request.json();

    if (!VALID_PLANS.includes(plan)) {
      return NextResponse.json(
        { error: '無効なプランです。' },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { plan },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'ユーザーデータの更新に失敗しました。' },
      { status: 500 },
    );
  }
}
