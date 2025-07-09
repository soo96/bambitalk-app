export type LoginDto = {
  accessToken: string;
};

export type SignupDto = {
  kakaoId: string;
  nickname: string;
  role: string;
};

type Role = 'DAD' | 'MOM' | null;

export type ApiResponse<T> = { code: number; message: string; data: T };
