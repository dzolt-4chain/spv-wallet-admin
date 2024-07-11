import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';

import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ContactAcceptDialog,
  ContactDeleteDialog,
  ContactEditDialog,
  ContactRejectDialog,
  contactsColumns,
  ContactStatus,
  DataTable,
  DateRangeFilter,
  NoRecordsText,
  Searchbar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
} from '@/components';

import { useSpvWalletClient } from '@/contexts';
import { contactsQueryOptions } from '@/utils';

export const Route = createFileRoute('/admin/_admin/contacts')({
  component: Contacts,
  validateSearch: z
    .object({
      createdRange: z.object({ from: z.string(), to: z.string() }).optional().catch(undefined),
      order_by_field: z.string().optional().catch('id'),
      sort_direction: z.string().optional().catch('desc'),
      updatedRange: z.object({ from: z.string(), to: z.string() }).optional().catch(undefined),
      id: z.string().optional(),
      paymail: z.string().optional(),
      pubKey: z.string().optional(),
    })
    .optional(),
  loaderDeps: ({ search }) => ({
    order_by_field: search?.order_by_field,
    sort_direction: search?.sort_direction,
    createdRange: search?.createdRange,
    updatedRange: search?.updatedRange,
    id: search?.id,
    paymail: search?.paymail,
    pubKey: search?.pubKey,
  }),
  loader: async ({ context: { spvWallet, queryClient }, deps }) => {
    const { createdRange, updatedRange, order_by_field, sort_direction, id, paymail, pubKey } = deps;
    return await queryClient.ensureQueryData(
      contactsQueryOptions({
        spvWalletClient: spvWallet.spvWalletClient!,
        updatedRange,
        createdRange,
        sort_direction,
        order_by_field,
        id,
        paymail,
        pubKey,
      }),
    );
  },
});

export function Contacts() {
  const [tab, setTab] = useState<string>('all');
  const [filter, setFilter] = useState<string>('');

  const { spvWalletClient } = useSpvWalletClient();

  const { id, paymail, pubKey, createdRange, updatedRange, order_by_field, sort_direction } =
    useSearch({
      from: '/admin/_admin/contacts',
    }) || {};

  const {
    data: { content: contacts },
  } = useSuspenseQuery(
    contactsQueryOptions({
      spvWalletClient: spvWalletClient!,
      updatedRange,
      createdRange,
      sort_direction,
      order_by_field,
      id,
      paymail,
      pubKey,
    }),
  );

  const [debouncedFilter] = useDebounce(filter, 200);

  const unconfirmedContacts = contacts.filter((c) => c.status === ContactStatus.Unconfirmed && c.deleted_at === null);
  const awaitingContacts = contacts.filter((c) => c.status === ContactStatus.Awaiting);
  const confirmedContacts = contacts.filter((c) => c.status === ContactStatus.Confirmed);
  const rejectedContacts = contacts.filter((c) => c.status === ContactStatus.Rejected);
  const deletedContacts = contacts.filter((c) => c.deleted_at !== null);

  const navigate = useNavigate({ from: Route.fullPath });

  useEffect(() => {
    if (tab !== 'all') {
      navigate({
        search: () => {
          return {};
        },
        replace: false,
      });
    }
  }, [tab]);

  useEffect(() => {
    navigate({
      search: (old) => {
        const id = filter.length === 32 ? filter : undefined;
        const paymail = filter.includes('@') ? filter : undefined;
        return {
          ...old,
          id,
          paymail,
          pubKey: !id && !paymail && filter ? filter : undefined,
        };
      },
      replace: true,
    });
  }, [debouncedFilter]);

  useEffect(() => {
    setFilter(id || paymail || pubKey || '');
    navigate({
      search: (old) => {
        const id = filter.length === 32 ? filter : undefined;
        const paymail = filter.includes('@') ? filter : undefined;
        return {
          ...old,
          id,
          paymail,
          pubKey: !id && !paymail && filter ? filter : undefined,
        };
      },
      replace: true,
    });
  }, [id, paymail, pubKey]);

  return (
    <>
      <Tabs defaultValue={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unconfirmed">Unconfirmed</TabsTrigger>
            <TabsTrigger value="awaiting">Awaiting</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="deleted">Deleted</TabsTrigger>
          </TabsList>
          <div className="flex">
            <Searchbar filter={filter} setFilter={setFilter} />
            <DateRangeFilter />
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="mb-2">
              {contacts.length > 0 ? (
                <DataTable
                  columns={contactsColumns}
                  data={contacts}
                  AcceptDialog={ContactAcceptDialog}
                  EditDialog={ContactEditDialog}
                  DeleteDialog={ContactDeleteDialog}
                  RejectDialog={ContactRejectDialog}
                />
              ) : (
                <NoRecordsText message="No Contacts to show." />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unconfirmed">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="mb-2">
              {unconfirmedContacts.length > 0 ? (
                <DataTable
                  columns={contactsColumns}
                  data={unconfirmedContacts}
                  EditDialog={ContactEditDialog}
                  DeleteDialog={ContactDeleteDialog}
                />
              ) : (
                <NoRecordsText message="No Contacts to show." />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="awaiting">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="mb-2">
              {awaitingContacts.length > 0 ? (
                <DataTable
                  columns={contactsColumns}
                  AcceptDialog={ContactAcceptDialog}
                  EditDialog={ContactEditDialog}
                  DeleteDialog={ContactDeleteDialog}
                  RejectDialog={ContactRejectDialog}
                  data={awaitingContacts}
                />
              ) : (
                <NoRecordsText message="No Contacts to show." />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="mb-2">
              {confirmedContacts.length > 0 ? (
                <DataTable
                  columns={contactsColumns}
                  data={confirmedContacts}
                  EditDialog={ContactEditDialog}
                  DeleteDialog={ContactDeleteDialog}
                />
              ) : (
                <NoRecordsText message="No Contacts to show." />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="mb-2">
              {rejectedContacts.length > 0 ? (
                <DataTable
                  columns={contactsColumns}
                  data={rejectedContacts}
                  EditDialog={ContactEditDialog}
                  DeleteDialog={ContactDeleteDialog}
                />
              ) : (
                <NoRecordsText message="No Contacts to show." />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deleted">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="mb-2">
              {deletedContacts.length > 0 ? (
                <DataTable
                  columns={contactsColumns}
                  data={deletedContacts}
                  EditDialog={ContactEditDialog}
                  DeleteDialog={ContactDeleteDialog}
                />
              ) : (
                <NoRecordsText message="No Contacts to show." />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster position="bottom-center" />
    </>
  );
}