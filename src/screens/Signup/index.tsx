import LoadingOverlay from '@/components/LoadingOverlay';
import InputField from '@/components/ui/InputFeild';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SelectableButtonGroup from '@/components/ui/SelectableButtonGroup';
import { Option } from '@/components/ui/SelectableButtonGroup';
import COLORS from '@/constants/colors';
import useSignupMutation from '@/hooks/useSignupMutation';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthStore } from '@/stores/useAuthStore';
import { RootStackParamList } from '@/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type SignupScreenProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;
type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;

interface SignupScreenProps {
  navigation: SignupScreenProp;
  route: SignupScreenRouteProp;
}

const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation, route }: SignupScreenProps) => {
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState<string>('');
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { kakaoId } = route.params;
  const { setAuth } = useAuthStore();

  const { mutateSignup, isPending } = useSignupMutation(navigation, setAuth);

  const genderOptions: Option[] = [
    { label: '아빠에요🙋🏻‍♂️', value: 'DAD' },
    { label: '엄마에요🙋🏻‍♀️', value: 'MOM' },
  ];

  const handleNicknameChange = (text: string) => {
    if (!touched) setTouched(true);

    setNickname(text);

    if (text.trim() === '') {
      setErrorMessage('닉네임을 입력해주세요.');
    } else if (text.trim().length < 2 || text.trim().length > 10) {
      setErrorMessage('닉네임은 2~10글자 사이여야 합니다.');
    } else {
      setErrorMessage('');
    }
  };

  //TODO: 초대코드로 가입
  const handlePressLink = () => {};

  const handleSignup = async () => {
    await mutateSignup({ kakaoId, nickname, role });
  };

  return (
    <DefaultLayout headerTitle="회원가입">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>환영합니다!</Text>
            <Text style={styles.title}>
              닉네임과 아이와의 관계를 알려주세요!
            </Text>
            <Text style={styles.description}>
              입력한 정보는 언제든 수정 가능해요!
            </Text>
          </View>

          <InputField
            placeholder="닉네임을 입력해주세요!"
            value={nickname}
            onChangeText={handleNicknameChange}
            status={!touched ? 'default' : errorMessage ? 'error' : 'success'}
          />
          <Text style={styles.errorMessage}>{touched && errorMessage}</Text>

          <SelectableButtonGroup
            options={genderOptions}
            selected={role}
            onSelect={setRole}
          />

          <TouchableOpacity
            onPress={handlePressLink}
            style={styles.linkWrapper}
          >
            <Text style={styles.link}>💌 배우자 초대 코드를 받으셨나요?</Text>
          </TouchableOpacity>

          <PrimaryButton
            label="가입하기"
            onPress={handleSignup}
            disabled={!nickname || !role || !!errorMessage}
          />
        </View>
      </View>
      <LoadingOverlay visible={isPending} />
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 40,
  },
  titleBox: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 24,
  },
  errorMessage: {
    fontSize: 12,
    color: COLORS.ERROR,
    paddingBottom: 20,
  },
  linkWrapper: {
    marginBottom: 50,
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
export default SignupScreen;
