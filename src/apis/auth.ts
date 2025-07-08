import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';

export const postLogin = async ({ accessToken }: loginDto) => {
  const result = await axiosClient.post(API_PATH.LOGIN, {
    accessToken,
  });

  return result.data;
};

export const postSignup = async ({ kakaoId, nickname, role }: signupDto) => {
  const result = await axiosClient.post(API_PATH.SIGNUP, {
    kakaoId,
    nickname,
    role,
  });

  return result.data;
};
