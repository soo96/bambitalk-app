import axiosClient from './axiosClient';

export const postLogin = async ({ accessToken }: loginDto) => {
  const result = await axiosClient.post('/api/v1/login', {
    accessToken,
  });

  return result.data;
};
