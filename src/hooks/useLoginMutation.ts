import { postLogin } from '@/apis/auth';
import { AuthPayload, useAuthStore } from '@/stores/useAuthStore';
import { RootStackParamList } from '@/types/navigation';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const useLoginMutation = (
  navigation: LoginScreenProp,
  setAuth: (payload: AuthPayload) => void,
) => {
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      const { needSignup, kakaoId, accessToken, refreshToken, user } =
        data.data;

      if (needSignup) {
        showSuccessToast('BambiTalk에 오신 걸 환영해요 👶');
        setTimeout(() => {
          navigation.replace('Signup', { kakaoId });
        }, 1000);
        return;
      }

      setAuth({ user, accessToken, refreshToken });

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      showSuccessToast('로그인 성공', 'BambiTalk에 오신 걸 환영해요 👶');
      setTimeout(() => {
        navigation.replace('BottomTabNavigator');
      }, 1000);
    },
    onError: (error) => {
      showErrorToast('🚨 로그인에 실패했어요.');
    },
  });

  return {
    mutateLogin: loginMutation.mutate,
    isPending: loginMutation.isPending,
  };
};

export default useLoginMutation;
