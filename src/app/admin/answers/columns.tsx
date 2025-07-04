import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export type Answer = {
  id: string;
  respondent: string;
  createdAt: string;
  formTitle: string;
};

export function getColumns(): ColumnDef<Answer>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'formTitle',
      header: 'フォーム名',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'respondent',
      header: '回答者',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'createdAt',
      header: '回答日時',
      cell: info => {
        const value = info.getValue() as string;
        return new Date(value).toLocaleString();
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const answer = row.original;
        return (
          <Link href={`/admin/answers/${answer.id}`} className="cursor-pointer">
            <Button variant="outline" size="sm">
              <Eye />
            </Button>
          </Link>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
