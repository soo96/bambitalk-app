import { API_PATH } from '@/constants/api';
import axiosClient from './axiosClient';

export const postFile = async (
  formData: FormData,
  onUploadProgress?: (percent: number) => void,
) => {
  const res = await axiosClient.post(API_PATH.FILE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1),
      );
      if (onUploadProgress) {
        onUploadProgress(percent);
      }
    },
  });

  return res.data.data;
};
