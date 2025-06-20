import { auth } from '@/auth';
import Header from '@/components/admin/navigation-header';
import Sidebar from '@/components/admin/sidebar';
import FormBuilder from './form-builder';

export default async function CreateFormPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* ヘッダー */}
      <Header />
      {/* サイドバー */}
      <Sidebar />
      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col">
        <div className="h-16"></div>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">フォーム作成</h1>
          <FormBuilder session={session} />
        </div>
      </main>
    </div>
  );
}
