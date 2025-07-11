import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';
import {
  CreateScheduleDto,
  DeleteScheduleParams,
  ScheduleItems,
  UpdateScheduleDto,
} from '@/types/schedule';
import { ApiResponse } from '@/types/api';

export const getSchedulesByYearMonth = async (yearMonth: string) => {
  const res = await axiosClient.get<ApiResponse<ScheduleItems[]>>(
    `${API_PATH.SCHEDULES}?yearMonth=${yearMonth}`,
  );
  return res.data.data;
};

export const createSchedule = async (data: CreateScheduleDto) => {
  return await axiosClient.post(API_PATH.SCHEDULES, data);
};

export const updateSchedule = async (data: UpdateScheduleDto) => {
  return await axiosClient.patch(
    `${API_PATH.SCHEDULES}/${data.scheduleId}`,
    data,
  );
};

export const deleteSchedule = async ({ scheduleId }: DeleteScheduleParams) => {
  return await axiosClient.delete(`${API_PATH.SCHEDULES}/${scheduleId}`);
};
