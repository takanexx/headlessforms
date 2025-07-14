'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AnswerDetail } from './page';

export default function AnswerCard({ answer }: { answer: AnswerDetail }) {
  return (
    <Card className="p-6">
      <div className="grid gap-y-6">
        <div className="grid grid-cols-6 gap-x-4">
          <p className="font-semibold">フォーム名</p>
          <p className="col-span-5">{answer.form?.title ?? '-'}</p>
        </div>
        <div className="grid grid-cols-6 gap-x-4">
          <p className="font-semibold">回答ID</p>
          <p className="col-span-5">{answer.id}</p>
        </div>

        <div className="grid grid-cols-6 gap-x-4">
          <p className="font-semibold">回答日時</p>
          <p className="col-span-5">
            {new Date(answer.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="grid gap-y-4">
          <p className="font-semibold">回答内容</p>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>項目名</TableHead>
                  <TableHead>回答</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {answer.answers &&
                  Object.entries(answer.answers).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableHead>{key}</TableHead>
                      <TableCell>
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {answer.meta && (
        <div className="mb-2">
          <span className="font-semibold">メタ情報：</span>
          <pre className="bg-gray-100 p-2 rounded text-xs">
            {JSON.stringify(answer.meta, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
