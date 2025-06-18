import { auth } from '@/auth';
import SignIn from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user || { name: 'ユーザー' };

  return (
    <div className="container mx-auto p-4">
      <h1>管理者ページ</h1>
      <p>ようこそ {user.name} さん</p>
      <div className="flex justify-center items-center h-screen gap-2">
        <SignIn />
        <SignOut />
      </div>
    </div>
  );
}
