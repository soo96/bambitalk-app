import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';
import { ScheduleItems } from '@/types/schedule';
import { ApiResponse } from '@/types/api';

export async function getSchedulesByYearMonth(yearMonth: string) {
  const res = await axiosClient.get<ApiResponse<ScheduleItems[]>>(
    `${API_PATH.SCHEDULES}?yearMonth=${yearMonth}`,
  );
  return res.data.data;
}
