import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import AccountTab from './account-tab';
import CheckoutForm from './checkout-form';

export default async function AccountPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const user = session?.user || { name: 'ユーザー', plan: 'Free' };

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 w-3/4 mx-auto">
          <div className="my-4 flex items-center gap-4">
            <User2 />
            <h1 className="text-2xl font-bold">Account</h1>
          </div>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="account">アカウント</TabsTrigger>
              <TabsTrigger value="billing">カード情報</TabsTrigger>
            </TabsList>
            <AccountTab user={user} />
            <TabsContent value="billing">
              <Card className="p-6 flex-col">
                <h3 className="text-2xl font-bold">Billing</h3>
                <div>
                  <p>
                    カード情報を提供すると、
                    <span className="font-semibold px-1">headlessforms</span>
                    がその規約に従って今後の支払いをお客様のカードに請求することを許可することになります。
                  </p>
                  <p>
                    カード情報は
                    <Button
                      className="font-semibold underline px-1"
                      variant={'link'}
                    >
                      Stripe
                    </Button>
                    にのみ送信・保存されます
                  </p>
                </div>
                <CheckoutForm />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
