import { getSchedulesByYearMonth } from '@/apis/schedule';
import { STALE_TIME } from '@/constants/api';
import { ScheduleItems } from '@/types/schedule';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export const useSchedulesByYearMonthQuery = (currentMonth: Date) => {
  const yearMonth = format(currentMonth, 'yyyy-MM');

  return useQuery<ScheduleItems[], Error>({
    queryKey: ['schedules', yearMonth],
    queryFn: () => getSchedulesByYearMonth(yearMonth),
    staleTime: STALE_TIME,
  });
};
