type loginDto = {
  accessToken: string;
};

type signupDto = {
  kakaoId: string;
  nickname: string;
  role: string;
};

type Role = 'DAD' | 'MOM' | null;
