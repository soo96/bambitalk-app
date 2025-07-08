import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';

export const fetchMessages = async ({
  cursor,
  limit = 20,
}: {
  cursor?: number | null;
  limit?: number;
}) => {
  try {
    const res = await axiosClient.get(API_PATH.MESSAGES, {
      params: {
        cursor,
        limit,
      },
      withCredentials: true,
    });

    return res.data.data.messages;
  } catch (error) {
    console.error('axios 에러:', error);
    throw error;
  }
};
