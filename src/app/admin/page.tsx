import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const user = session?.user || { name: 'ユーザー' };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Usageヘッダー */}
      <div className="flex items-center justify-between px-8 pt-8 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">bar_chart</span>
            <h2 className="text-xl font-bold">Usage</h2>
            <span className="ml-2 text-muted-foreground text-sm">?</span>
          </div>
          <div className="text-muted-foreground text-xs mt-1">
            Showing usage from{' '}
            <span className="font-semibold">June 1, 2025</span> through{' '}
            <span className="font-semibold">July 1, 2025</span>
          </div>
        </div>
        <div>
          <Select>
            <option>Current billing period</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-8 py-4">
        <div className="flex flex-row gap-4 w-full">
          {/* EAS Updateカード */}
          <Card className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">update</span>
                <span className="font-semibold">EAS Update</span>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            <div className="flex gap-8 mt-2">
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">
                  Monthly active users
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">0 GiB</div>
                <div className="text-xs text-muted-foreground">
                  Global edge bandwidth
                </div>
              </div>
            </div>
          </Card>

          {/* EAS Buildカード */}
          <Card className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">build</span>
                <span className="font-semibold">EAS Build</span>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            <div className="flex gap-8 mt-2">
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground">Builds</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">
                  Android builds
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground">iOS builds</div>
              </div>
            </div>
          </Card>
        </div>
        {/* Buildsセクション */}
        <Card className="p-4 flex flex-col gap-4">
          <div className="font-semibold mb-2">Builds</div>
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
