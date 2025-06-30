import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { getPlanAnswerLimit, getPlanFormLimit } from '@/utils/plans';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const user = session?.user || { name: 'ユーザー' };
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const forms = await fetch(`${baseUrl}/api/form/list`).then(res => res.json());
  const answers = await fetch(`${baseUrl}/api/answer/list`).then(res =>
    res.json(),
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Usageヘッダー */}
      <div className="flex items-center justify-between px-8 pt-8 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Home</h1>
          </div>
          <div className="text-muted-foreground text-xs mt-1">
            Showing usage from{' '}
            <span className="font-semibold">June 1, 2025</span> through{' '}
            <span className="font-semibold">July 1, 2025</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-8 py-4">
        <div className="flex-row gap-10 w-full grid grid-cols-2">
          {/* Formsカード */}
          <Card className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex-col items-center gap-2">
                <span className="font-semibold">Forms</span>
                <div className="text-muted-foreground text-xs mt-1">
                  {'Your Account is '}
                  <span className="font-bold">{user.plan}</span>
                  {' plan'}
                </div>
              </div>
              <Button variant="default" size="sm">
                <Link href="/pricing">Upgrade</Link>
              </Button>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex gap-8 mt-2">
              <div>
                <div className="text-2xl font-bold">{forms.length ?? 0}</div>
                <div className="text-xs text-muted-foreground">フォーム数</div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div className="text-2xl font-bold">
                  {getPlanFormLimit(user.plan) - forms.length || 0}
                </div>
                <div className="text-xs text-muted-foreground">残数</div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div className="text-2xl font-bold">
                  {getPlanFormLimit(user.plan)}
                </div>
                <div className="text-xs text-muted-foreground">Limit forms</div>
              </div>
            </div>
          </Card>

          {/* Answersカード */}
          <Card className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex-col items-center gap-2">
                <span className="font-semibold">Answers</span>
                <div className="text-muted-foreground text-xs mt-1">
                  Showing usage from{' '}
                  <span className="font-semibold">June 1, 2025</span> through{' '}
                  <span className="font-semibold">July 1, 2025</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex gap-8 mt-2">
              <div>
                <div className="text-2xl font-bold">{answers.length ?? 0}</div>
                <div className="text-xs text-muted-foreground">Answers</div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div className="text-2xl font-bold">
                  {getPlanAnswerLimit(user.plan) - answers.length || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Left Answers
                </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div className="text-2xl font-bold">
                  {getPlanAnswerLimit(user.plan)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Per month limit
                </div>
              </div>
            </div>
          </Card>
        </div>
        {/* Buildsセクション */}
        <Card className="p-4 flex flex-col gap-4">
          <h3 className="font-semibold mb-2">Answers Chart</h3>
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-muted-foreground mr-1">
                Platform
              </label>
              <Select>
                <option>All</option>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mr-1">
                Resource Class
              </label>
              <Select>
                <option>All</option>
              </Select>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-xs text-muted-foreground">
                Show cumulative usage
              </label>
              <input type="checkbox" className="accent-primary" />
            </div>
          </div>
          <Separator />
          {/* チャートダミーエリア */}
          <div className="h-64 flex items-center justify-center text-muted-foreground bg-muted rounded">
            チャートが表示されます
          </div>
          {/* 凡例 */}
          <div className="flex gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-lime-400"></span>
              Android Medium
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-lime-600"></span>
              Android Large
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
              iOS Medium
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
              iOS Large
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
