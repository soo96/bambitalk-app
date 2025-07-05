import axiosClient from './axiosClient';

export const postLogin = async ({ accessToken }: loginDto) => {
  const result = await axiosClient.post('/auth/login', {
    accessToken,
  });

  return result.data;
};
