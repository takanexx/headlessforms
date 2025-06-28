'use client';

import SignIn from '@/components/sign-in';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    price: '0円',
    description: ['フォーム3個まで', '月100回答まで'],
  },
  {
    name: 'Pro',
    price: '980円',
    description: ['フォーム10個まで', '月1,000回答まで'],
  },
  {
    name: 'Business',
    price: '4,980円',
    description: ['フォーム無制限', '回答無制限', 'Webhook対応'],
  },
];

export default function PricingPage() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-8">料金プラン</h1>
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 justify-center my-15">
          {plans.map((plan, idx) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelected(idx)}
              className="flex-1 focus:outline-none"
              style={{ minWidth: 0 }}
            >
              <Card
                className={`w-full h-full flex flex-col items-center p-6 shadow-md border-2 transition-all
                  ${
                    selected === idx
                      ? 'border-blue-500 shadow-blue-200 ring-2 ring-blue-200 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                  }`}
              >
                <div className="text-xl font-semibold mb-2">{plan.name}</div>
                <div className="text-3xl font-bold mb-4">{plan.price}/月</div>
                <ul className="mb-4 space-y-1 text-center">
                  {plan.description.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </button>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <Button className="mt-8 w-60 text-lg" onClick={() => setOpen(true)}>
            {plans[selected].name}で始める
          </Button>
          <DialogContent>
            <DialogTitle>アカウント登録</DialogTitle>
            <DialogDescription>
              Googleアカウントで簡単に始められます。登録後すぐにプランを選択できます。
            </DialogDescription>
            <div className="flex flex-col items-center mt-4">
              <SignIn />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
