import { Color } from './color';

export interface ScheduleItem {
  scheduleId: number;
  title: string;
  description?: string | null;
  date: string;
  time: string;
  color: Color;
  isCompleted: boolean;
  creatorId: number;
  creatorRole: 'DAD' | 'MOM' | null;
}

export interface ScheduleItems {
  date: string;
  schedules: ScheduleItem[];
}

export interface CreateScheduleDto {
  title: string;
  description?: string;
  date: string;
  color?: string;
  yearMonth?: string;
}

export interface UpdateScheduleDto {
  scheduleId: number;
  title?: string;
  description?: string;
  date?: string;
  color?: string;
  isCompleted?: boolean;
  yearMonth?: string;
}

export interface DeleteScheduleParams {
  scheduleId: number;
  yearMonth?: string;
}
