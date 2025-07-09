import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';
import { LoginDto, SignupDto } from '@/types/api';

export const postLogin = async ({ accessToken }: LoginDto) => {
  const result = await axiosClient.post(API_PATH.LOGIN, {
    accessToken,
  });

  return result.data;
};

export const postSignup = async ({ kakaoId, nickname, role }: SignupDto) => {
  const result = await axiosClient.post(API_PATH.SIGNUP, {
    kakaoId,
    nickname,
    role,
  });

  return result.data;
};
