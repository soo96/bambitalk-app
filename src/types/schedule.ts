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
