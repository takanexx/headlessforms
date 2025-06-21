import { auth } from '@/auth';
import FormBuilder from './form-builder';

export default async function CreateFormPage() {
  const session = await auth();

  return (
    <div className="flex bg-background dark:bg-background">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">フォーム作成</h1>
          <FormBuilder session={session} />
        </div>
      </div>
    </div>
  );
}
