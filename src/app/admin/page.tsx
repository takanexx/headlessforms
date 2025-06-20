import { auth } from '@/auth';
import Header from '@/components/admin/navigation-header';
import Sidebar from '@/components/admin/sidebar';
import SignIn from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user || { name: 'ユーザー' };

  return (
    <div className="flex min-h-screen bg-background">
      {/* ヘッダー */}
      <Header />
      {/* サイドバー */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="h-16"></div>
        <div className="flex-1 p-6">
          <Card className="p-6 flex flex-col items-center">
            <h1>管理者ページ</h1>
            <p>ようこそ {user.name} さん</p>
            <Separator className="mb-4" />
            <div className="flex flex-col items-center gap-2">
              <SignIn />
              <SignOut />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
