import { ScheduleItem } from './schedule';

export type LoginDto = {
  accessToken: string;
};

export type SignupDto = {
  kakaoId: string;
  nickname: string;
  role: string;
};

type Role = 'DAD' | 'MOM' | null;
