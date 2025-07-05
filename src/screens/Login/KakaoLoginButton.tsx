import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

type LoginScreenProps = {
  onPress: () => void;
};

const KakaoLoginButton = ({ onPress }: LoginScreenProps) => {
  return (
    <Pressable onPress={onPress} style={styles.kakaoButton}>
      <Image
        source={require('@/assets/images/kakao_login.png')}
        style={styles.kakaoButtonImage}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  kakaoButton: {
    width: width * 0.8,
    height: 50,
  },
  kakaoButtonImage: {
    width: '100%',
    height: '100%',
  },
});

export default KakaoLoginButton;
