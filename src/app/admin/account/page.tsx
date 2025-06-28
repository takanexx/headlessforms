import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TriangleAlert, User2 } from 'lucide-react';
import { redirect } from 'next/navigation';
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
            <TabsContent value="account">
              <Card className="p-10">
                <h3 className="font-bold">アカウント</h3>
                <div className="flex flex-row gap-10">
                  <div className="px-4">
                    <img
                      src={user.image || ''}
                      alt={user.name || ''}
                      className="rounded-full w-fit"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="name">名前</Label>
                    <Input
                      id="name"
                      value={user.name || ''}
                      className="mt-2 w-full"
                    />
                    <Label htmlFor="name">プラン</Label>
                    <p className="pt-2">{user.plan}</p>

                    <div className="flex justify-end mt-10">
                      <Button type="button">保存</Button>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="mt-10">
                <div className=" flex items-center gap-4">
                  <TriangleAlert className="text-red-500" />
                  <h2 className="text-2xl font-bold">Danger Zone</h2>
                </div>
                <Card className="p-10 flex-col mt-5">
                  <div className="items-center gap-2">
                    <p className="font-bold">アカウントの削除</p>
                    <Button
                      type="button"
                      variant={'link'}
                      className="text-red-500 cursor-pointer"
                    >
                      アカウントを削除する
                      <ArrowRight />
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
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
