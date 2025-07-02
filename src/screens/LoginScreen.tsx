import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { RootStackParamList } from '@/app/RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { postLogin } from '@/apis/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenProp;
}

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const handleKakaoLogin = async () => {
    try {
      const kakaoToken: KakaoOAuthToken = await login();
      const { accessToken, refreshToken, isNewUser } = await postLogin(
        kakaoToken,
      );

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      const navigationScreen = isNewUser
        ? 'ChildInfoMainScreen'
        : 'MyChildProfileScreen';

      navigation.navigate(navigationScreen);
    } catch (e) {
      console.error('로그인에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/baby.jpg')}
        style={styles.babyImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>BambiTalk</Text>

      <Pressable onPress={handleKakaoLogin} style={styles.kakaoButton}>
        <Image
          source={require('@/assets/images/kakao_login.png')}
          style={styles.kakaoButtonImage}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  babyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  kakaoButton: {
    width: width * 0.8,
    height: 50,
  },
  kakaoButtonImage: {
    width: '100%',
    height: '100%',
  },
});
