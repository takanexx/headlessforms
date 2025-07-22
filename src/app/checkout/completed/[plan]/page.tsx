import { Card } from '@/components/ui/card';
import { SessionProvider } from 'next-auth/react';
import RedirectAdminButton from './redirect-admin-button';

export default async function AccountPage({
  params,
}: {
  params: { plan: string };
}) {
  const { plan } = await params;
  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="p-6 w-3/5 mx-auto my-auto items-center">
          <div className="py-4">
            <h1 className="text-center font-semibold text-2xl">お支払い完了</h1>
          </div>
          <SessionProvider>
            <Card className="p-6 flex-col">
              <div>
                <p>
                  <span className="font-semibold px-1">{plan}</span>
                  プランへのお支払いが完了しました。
                </p>
                <p>数秒後、自動で管理画面に移動します。</p>
                <p>お待ちください...</p>
                <p>戻らない場合は、以下のボタンをクリックしてください。</p>
                <RedirectAdminButton plan={plan} />
              </div>
            </Card>
          </SessionProvider>
        </div>
      </div>
    </div>
  );
}
