import axiosClient from './axiosClient';

export const postLogin = async ({ accessToken }: loginDto) => {
  const result = await axiosClient.post('/auth/login', {
    accessToken,
  });

  return result.data;
};

export const postSignup = async ({ kakaoId, nickname, role }: signupDto) => {
  const result = await axiosClient.post('/auth/signup', {
    kakaoId,
    nickname,
    role,
  });

  return result.data;
};
