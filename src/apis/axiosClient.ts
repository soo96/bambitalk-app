import { API_PATH } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

const AUTH_EXCLUDE_PATHS = [API_PATH.LOGIN, API_PATH.SIGNUP, API_PATH.REFRESH];

const axiosClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');

  if (token && !AUTH_EXCLUDE_PATHS.some((path) => config.url?.includes(path))) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
