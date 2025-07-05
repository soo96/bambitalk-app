import { RootStackParamList } from '@/app/RootStack';
import InputField from '@/components/ui/InputFeild';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SelectableButtonGroup from '@/components/ui/SelectableButtonGroup';
import { Option } from '@/components/ui/SelectableButtonGroup';
import COLORS from '@/constants/colors';
import DefaultLayout from '@/layouts/DefaultLayout';
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

interface SignupScreenProps {
  navigation: SignupScreenProp;
}

const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSignup = () => {};

  const handlePressLink = () => {};

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
