import { signOut } from '@/auth';
import { Button } from './ui/button';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit" variant={'outline'}>
        Sign Out
      </Button>
    </form>
  );
}
