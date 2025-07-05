import axios from 'axios';
import Config from 'react-native-config';

const axiosClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
