import { postSignup } from '@/apis/auth';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { unlink } from '@react-native-seoul/kakao-login';
import { RootStackParamList } from '@/types/navigation';

type SignupScreenProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const useSignupMutation = (navigation: SignupScreenProp) => {
  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      showSuccessToast('회원가입 성공', 'BambiTalk에 오신 걸 환영해요 👶');
      setTimeout(() => {
        navigation.replace('BottomTabNavigator');
      }, 1000);
    },
    onError: async () => {
      await unlink();
      showErrorToast('🚨 회원가입에 실패했어요.');
      navigation.replace('Login');
    },
  });

  return {
    mutateSignup: signupMutation.mutate,
    isPending: signupMutation.isPending,
  };
};

export default useSignupMutation;
