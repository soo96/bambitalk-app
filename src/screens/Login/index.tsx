import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import LoadingOverlay from '@/components/LoadingOverlay';
import KakaoLoginButton from './KakaoLoginButton';
import useLoginMutation from '@/hooks/useLoginMutation';
import { RootStackParamList } from '@/types/navigation';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { mutateLogin, isPending } = useLoginMutation(navigation);

  const handleKakaoLogin = async () => {
    const kakaoToken: KakaoOAuthToken = await login();
    await mutateLogin(kakaoToken);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/baby.jpg')}
        style={styles.babyImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>BambiTalk</Text>
      <KakaoLoginButton onPress={handleKakaoLogin} />
      <LoadingOverlay visible={isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  babyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});

export default LoginScreen;
