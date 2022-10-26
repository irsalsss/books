import { useInfiniteQuery } from "react-query";
import client from "utils/client";
import { TQueryOptions } from "types/client";

export const getBooks = (categoryId: string, queryOptions?: TQueryOptions) => {
  const fetchBooks = ({ pageParam = 0 }) => client(`/fee-assessment-books`, { params: {
    categoryId,
    page: pageParam,
    size: 10,
  }})()
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['getBooks'],
    fetchBooks,
    {
      enabled: Boolean(categoryId),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length >= 10) {
          return pages.length * 10;
        }
        return undefined;
      },
      ...queryOptions
    }
  );
  
  return {
    data,
    hasNextPage, 
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};