import { postLogin } from '@/apis/auth';
import { RootStackParamList } from '@/app/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const useLoginMutation = (navigation: LoginScreenProp) => {
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      const { needSignup, accessToken, refreshToken } = data.data;

      if (needSignup) {
        navigation.replace('Signup');
        return;
      }

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      navigation.navigate('MyChildProfile');
    },
  });

  return {
    mutateLogin: loginMutation.mutate,
    isPending: loginMutation.isPending,
  };
};

export default useLoginMutation;
