'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '../admin/account/checkout-form';

export default function AccountPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') ?? 'free';

  return (
    <div className="flex bg-background dark:bg-background">
      <div className="flex-1 flex flex-col">
        <div className="p-6 w-3/5 mx-auto my-auto items-center">
          <div className="py-4">
            <h1 className="text-center font-semibold text-2xl">お支払い</h1>
          </div>
          <Card className="p-6 flex-col">
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
            <CheckoutForm plan={plan} />
          </Card>
        </div>
      </div>
    </div>
  );
}
