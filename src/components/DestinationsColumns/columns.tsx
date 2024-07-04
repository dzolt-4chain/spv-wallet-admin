import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

import { Destination } from '@bsv/spv-wallet-js-client';
import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge.tsx';

import { Button } from '@/components/ui/button.tsx';
import { getSortDirection } from '@/utils';

export interface DestinationColumns extends Destination {
  status: string;
}

export const columns: ColumnDef<DestinationColumns>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Link
          from={'/destinations'}
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
    cell: ({ row }) => {
      return (
        row.getValue('id') && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="align-middle">
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] block">
                  {row.getValue('id')}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.getValue('id')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      );
    },
  },
  {
    accessorKey: 'xpub_id',
    header: ({ column }) => {
      return (
        <Link
          from={'/destinations'}
          search={(prev) => ({
            ...prev,
            order_by_field: 'xpub_id',
            sort_direction: getSortDirection(column),
          })}
        >
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Xpub ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    },
    cell: ({ row }) => {
      return (
        row.getValue('xpub_id') && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="align-middle">
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100px] block">
                  {row.getValue('xpub_id')}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.getValue('xpub_id')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      );
    },
  },
  {
    accessorKey: 'locking_script',
    header: ({ column }) => {
      return (
        <Link
          from={'/destinations'}
          search={(prev) => ({
            ...prev,
            order_by_field: 'locking_script',
            sort_direction: getSortDirection(column),
          })}
        >
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Locking Script
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <Link
          from={'/destinations'}
          search={(prev) => ({
            ...prev,
            order_by_field: 'address',
            sort_direction: getSortDirection(column),
          })}
        >
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Address
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
      return row.getValue('status') === 'deleted' ? (
        <Badge variant="secondary">Deleted</Badge>
      ) : row.getValue('status') === 'revoked' ? (
        <Badge variant="secondary">Revoked</Badge>
      ) : (
        <Badge variant="outline">Active</Badge>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Link
          from={'/destinations'}
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
      return row.getValue('created_at') && new Date(row.getValue('created_at')).toLocaleString();
    },
  },
];