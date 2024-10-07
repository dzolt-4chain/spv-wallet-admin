import { SpvWalletClientExtended } from '@/contexts';
import { queryOptions } from '@tanstack/react-query';

export interface XPubQueryOptions {
  filterStr?: string;
  page?: number;
  page_size?: number;
  order_by_field?: string;
  sort_direction?: string;
  spvWalletClient: SpvWalletClientExtended;
}

export const xPubQueryOptions = (opts: XPubQueryOptions) => {
  return queryOptions({
    queryKey: ['xpubs', opts],
    queryFn: async () => {
      console.log('--- QUERING: --- ');

      return fetch('/admin/xpubs/search').then((res) => {
        return [
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
            id: '378aa9182fc61b1c6b8e132bb6f1b52f3c85320407d259a95a8cf2dcbbfa9d8c',
            current_balance: 121,
            next_internal_num: 8,
            next_external_num: 2,
            status: '',
          },
        ];
      });
    },
  });
};
