import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';

export const getInviteCode = async () => {
  const res = await axiosClient.post(API_PATH.COUPLE.INVITE_CODE);

  return res.data;
};
