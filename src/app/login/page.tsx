import SignIn from '@/components/sign-in';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Card className="p-6 items-center min-w-md">
          <h1 className="font-bold text-xl">Sign In</h1>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <SignIn />
          </div>
        </Card>
      </main>
    </div>
  );
}
