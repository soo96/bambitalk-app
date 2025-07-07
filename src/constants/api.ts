export const API_PREFIX = '/api/v1';

export const API_PATH = {
  SIGNUP: API_PREFIX + '/auth/signup',
  LOGIN: API_PREFIX + '/auth/login',
  LOGOUT: API_PREFIX + '/auth/logout',
  REFRESH: API_PREFIX + 'auth/tokens/refresh',
  CHATS: API_PREFIX + '/chats',
  SCHEDULES: API_PREFIX + '/schedules',
  CHILDREN: API_PREFIX + '/children',
  NOTIFICATIONS: API_PREFIX + '/notifications',
  USERS: API_PREFIX + 'users/me',
};
