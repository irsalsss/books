import { useQuery } from "react-query";
import client from "utils/client";
import { TQueryOptions } from "types/client";

export const getBooks = (params: Object, queryOptions?: TQueryOptions) => {
  const {
    data, isLoading, isError, refetch
  } = useQuery(
    ['getBooks'],
    client(`/fee-assessment-books`, { params }),
    queryOptions
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};