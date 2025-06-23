import { auth } from '@/auth';
import SignIn from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User2 } from 'lucide-react';

export default async function AccountPage() {
  const session = await auth();
  const user = session?.user || { name: 'ユーザー' };

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 w-4/5 mx-auto">
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
              <Card className="p-6 flex-col">
                <h1>Account</h1>
                <p>ようこそ {user.name} さん</p>
                <Separator className="mb-4" />
                <div className="flex flex-col items-center gap-2">
                  <SignIn />
                  <SignOut />
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="billing">
              <Card className="p-6 flex-col">
                <h1>Billing</h1>
                <Separator className="mb-4" />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
