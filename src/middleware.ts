import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();

  // 未認証のユーザーはログインページにリダイレクト
  if (!session) {
    console.log('ユーザーは未認証です。ログインページにリダイレクトします。');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
