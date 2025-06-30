import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type Form = {
  id: string;
  title: string;
  createdAt: string;
};

export function getColumns(): ColumnDef<Form>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'ID',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'title',
      header: '名前',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'createdAt',
      header: '作成日時',
      cell: info => {
        const value = info.getValue() as string;
        return new Date(value).toLocaleString();
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const form = row.original;
        return (
          <div className="flex gap-2">
            <Link href={`/admin/forms/edit/${form.id}`}>
              <Button size="sm" variant="outline">
                編集
              </Button>
            </Link>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
