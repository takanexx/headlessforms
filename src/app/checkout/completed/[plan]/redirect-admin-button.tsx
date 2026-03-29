'use client';

import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectAdminButton({ plan }: { plan: string }) {
  const session = useSession();

  const savePlan = async () => {
    await fetch('/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });

    redirect('/admin');
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      setTimeout(() => {});
      savePlan();
    }
  }, [session.status]);

  return (
    <Link href="/admin" className="">
      <Button
        className="font-semibold underline px-1"
        variant={'link'}
        onClick={() => {
          savePlan();
        }}
      >
        管理画面へ移動
      </Button>
    </Link>
  );
}
