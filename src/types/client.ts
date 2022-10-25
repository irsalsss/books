import { UseQueryOptions, UseMutationOptions } from 'react-query';

type TQueryOptions = Omit<UseQueryOptions<any, unknown, any, any[]>, 'queryKey' | 'queryFn'>;
type TMutationOptions = | Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'>| undefined;

export type {
  TQueryOptions,
  TMutationOptions,
};
