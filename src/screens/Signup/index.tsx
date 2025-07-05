import { RootStackParamList } from '@/app/RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

type SignupScreenProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

interface SignupScreenProps {
  navigation: SignupScreenProp;
}

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  return (
    <View>
      <Text>회원가입 페이지</Text>
    </View>
  );
};

export default SignupScreen;
