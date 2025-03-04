import { Tx } from '@bsv/spv-wallet-js-client';
import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components';
import { Button } from '@/components/ui';
import { getSortDirection } from '@/utils';

export const columns: ColumnDef<Tx>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Link
          search={(prev) => ({
            ...prev,
            order_by_field: 'id',
            sort_direction: getSortDirection(column),
          })}
        >
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'blockHeight',
    header: ({ column }) => {
      return (
        <Link
          search={(prev) => ({
            ...prev,
            order_by_field: 'block_height',
            sort_direction: getSortDirection(column),
          })}
        >
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Block Height
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue('status') ? (
        <Badge variant="secondary">Prepared</Badge>
      ) : (
        <Badge variant="outline">Recorded</Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Link
          search={(prev) => ({
            ...prev,
            order_by_field: 'created_at',
            sort_direction: getSortDirection(column),
          })}
        >
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    },
    cell: ({ row }) => {
      return row.getValue('createdAt') && new Date(row.getValue('createdAt')).toLocaleString();
    },
  },
];
