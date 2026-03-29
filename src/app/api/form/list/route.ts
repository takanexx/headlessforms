import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const forms = await prisma.form.findMany({ where: { userId } });
    return NextResponse.json(forms);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'フォームリストの取得に失敗しました。' },
      { status: 500 },
    );
  }
}
