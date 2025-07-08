'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { ArrowRight, TriangleAlert } from 'lucide-react';
import { User } from 'next-auth';
import Link from 'next/link';
import { useState } from 'react';

export default function AccountTab({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? '');
  return (
    <TabsContent value="account">
      <Card className="p-10">
        <h3 className="font-bold">アカウント</h3>
        <div className="flex flex-row gap-10">
          <div className="px-4">
            <img
              src={user.image || ''}
              alt={user.name || ''}
              className="rounded-full w-fit"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">名前</Label>
              <Input
                id="name"
                defaultValue={name}
                onChange={e => {
                  setName(e.target.name);
                }}
                className="mt-2 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">プラン</Label>
              <div className="flex flex-row items-center gap-4">
                <p className="font-semibold text-lg">{user.plan}</p>
                <Button
                  variant={'link'}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Link href="/pricing" className="flex items-center gap-2 ">
                    アップグレード
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <Button type="button">保存</Button>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-10">
        <div className=" flex items-center gap-4">
          <TriangleAlert className="text-red-500" />
          <h2 className="text-2xl font-bold">Danger Zone</h2>
        </div>
        <Card className="p-10 flex-col mt-5">
          <div className="items-center gap-2">
            <p className="font-bold">アカウントの削除</p>
            <Button
              type="button"
              variant={'link'}
              className="text-red-500 cursor-pointer"
            >
              アカウントを削除する
              <ArrowRight />
            </Button>
          </div>
        </Card>
      </div>
    </TabsContent>
  );
}
