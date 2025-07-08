import { fetchMessages } from '@/apis/message';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMessagesInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: ({ pageParam = null }) => fetchMessages({ cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].id;
    },
  });
};
