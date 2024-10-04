import {
  AddXpubDialog,
  CustomErrorComponent,
  Searchbar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  XpubsSkeleton,
  XpubsTabContent,
} from '@/components';
import { useSpvWalletClient } from '@/contexts';

import { addStatusField, xPubQueryOptions } from '@/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { z } from 'zod';
import { XpubExtended } from '@/interfaces';

export const Route = createFileRoute('/admin/_admin/xpub')({
  validateSearch: z.object({
    order_by_field: z.string().optional().catch('id'),
    sort_direction: z.string().optional().catch('asc'),
  }),
  component: Xpub,
  errorComponent: ({ error }) => <CustomErrorComponent error={error} />,
  pendingComponent: () => <XpubsSkeleton />,
});

export function Xpub() {
  const { spvWalletClient } = useSpvWalletClient();
  const [tab, setTab] = useState<string>('all');
  const [filter, setFilter] = useState<string>('');
  const [debouncedFilter] = useDebounce(filter, 200);

  const xpubs: XpubExtended[] = [
    {
      created_at: new Date('2024-08-02T09:22:06.184649Z'),
      updated_at: new Date('2024-08-02T09:22:06.184649Z'),
      id: 'e7d96399df6400de6a16d34adf63fcb500b0b6cd9f016db4b8201b99d24679df',
      current_balance: 0,
      next_internal_num: 0,
      next_external_num: 1,
      status: '',
    },
    {
      created_at: new Date('2024-08-02T09:22:06.184649Z'),
      updated_at: new Date('2024-08-02T09:22:06.184649Z'),
      id: 'd996ee8eaec948344cc786869631b5b6d8da946022dbdd620e44af39d4676dde',
      current_balance: 0,
      next_internal_num: 0,
      next_external_num: 0,
      status: '',
    },
    {
      created_at: new Date('2024-08-02T09:22:06.184649Z'),
      updated_at: new Date('2024-08-02T09:22:06.184649Z'),
      id: '8d15111d656d7b7034d08b007ff66d3e78ba38228a7cfa4be18f91296b8632dc',
      current_balance: 125,
      next_internal_num: 35,
      next_external_num: 2,
      status: '',
    },
    {
      created_at: new Date('2024-08-02T09:22:06.184649Z'),
      updated_at: new Date('2024-08-02T09:22:06.184649Z'),
      id: '378aa9182fc61b1c6b8e132bb6f1b52f3c85320407d259a95a8cf2dcbbfa9d8c',
      current_balance: 121,
      next_internal_num: 8,
      next_external_num: 2,
      status: '',
    },
  ];


  const mappedXpubs = addStatusField(xpubs);

  // TODO: Add server pagination for xpubs when search and count will be merged

  return (
    <>
      <Tabs defaultValue={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="flex">
            <AddXpubDialog className="mr-3" />
            <Searchbar filter={filter} setFilter={setFilter} placeholder="Search by ID" />
          </div>
        </div>
        <TabsContent value="all">
          <XpubsTabContent xpubs={mappedXpubs} />
        </TabsContent>
      </Tabs>
      <Toaster position="bottom-center" />
    </>
  );
}
