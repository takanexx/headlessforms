import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      // 初期化時にGoogleからユーザー情報を取得
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          lan: profile.plan ?? 'free',
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.plan = user.plan;
      return session;
    },
  },
});
