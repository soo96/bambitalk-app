import { postLogin } from '@/apis/auth';
import { RootStackParamList } from '@/app/RootStack';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const useLoginMutation = (navigation: LoginScreenProp) => {
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      const { needSignup, kakaoId, accessToken, refreshToken } = data.data;

      if (needSignup) {
        showSuccessToast('BambiTalk에 오신 걸 환영해요 👶');
        setTimeout(() => {
          navigation.replace('Signup', { kakaoId });
        }, 1000);
        return;
      }

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      showSuccessToast('로그인 성공', 'BambiTalk에 오신 걸 환영해요 👶');
      setTimeout(() => {
        navigation.replace('MyChildProfile');
      }, 1000);
    },
    onError: () => {
      showErrorToast('🚨 로그인에 실패했어요.');
    },
  });

  return {
    mutateLogin: loginMutation.mutate,
    isPending: loginMutation.isPending,
  };
};

export default useLoginMutation;
