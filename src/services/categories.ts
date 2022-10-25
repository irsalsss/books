import { useQuery } from "react-query";
import client from "utils/client";
import { TQueryOptions } from "types/client";

export const getCategories = (queryOptions?: TQueryOptions) => {
  const {
    data, isLoading, isError, refetch
  } = useQuery(
    ['getCategories'],
    client(`/fee-assessment-categories`),
    queryOptions
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};