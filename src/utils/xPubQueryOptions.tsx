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

      return fetch('/admin/xpubs/search').then((res) => res.json());
    },
  });
};
