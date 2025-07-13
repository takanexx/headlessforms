'use client';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function SignIn({ redirectTo }: { redirectTo?: string }) {
  return (
    <Button onClick={() => signIn('google', { redirectTo: redirectTo })}>
      Sign In with Google
    </Button>
  );
}
