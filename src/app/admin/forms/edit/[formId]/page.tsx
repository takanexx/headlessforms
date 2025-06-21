import FormBuilder from '@/app/admin/forms/edit/form-editor';
import { auth } from '@/auth';
import Header from '@/components/admin/navigation-header';
import Sidebar from '@/components/admin/sidebar';

export default async function EditFormPage({
  params,
}: {
  params: { formId: string };
}) {
  const session = await auth();
  const { formId } = params;
  const baseUrl = 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/form/retrieve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId }),
  });

  console.log(response.json());

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
          <h1 className="text-2xl font-bold mb-4">フォーム編集</h1>
          <FormBuilder session={session} />
        </div>
      </main>
    </div>
  );
}
