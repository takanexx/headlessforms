import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

export type Answer = {
  id: string;
  respondent: string;
  createdAt: string;
};

export function getColumns(
  handleDelete: (id: string) => void,
): ColumnDef<Answer>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-28">
              <DropdownMenuItem asChild>
                <Link href={`/admin/answers/${answer.id}`}>詳細</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(answer.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
