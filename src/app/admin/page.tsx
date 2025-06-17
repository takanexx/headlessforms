import SignIn from '@/components/sign-in';

export default async function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1>管理者ページ</h1>
      <p>ようこそ ユーザー さん</p>
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}
