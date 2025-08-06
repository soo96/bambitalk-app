import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import COLORS from '@/constants/colors';
import { logout } from '@react-native-seoul/kakao-login';
import { BottomTabParamList, RootStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { showSuccessToast } from '@/utils/toastUtil';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGenerateInviteCodeMutation } from '@/hooks/useGenerateInviteCodeMutation';
import LoadingOverlay from '@/components/LoadingOverlay';

type SettingScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Setting'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const SettingScreen = () => {
  const navigation = useNavigation<SettingScreenNavigationProp>();
  const { user, clearAuth } = useAuthStore();
  const { mutateGenerateInviteCode, isPending } =
    useGenerateInviteCodeMutation();

  const spouseId = user?.spouseId ?? null;

  const handleInvite = async () => {
    await mutateGenerateInviteCode();
  };

  const handleEnterCode = () => {
    // TODO: 초대코드 입력 모달 열기
  };

  const handleLogout = async () => {
    await logout();
    clearAuth();
    showSuccessToast('로그아웃 성공👋', '로그인 화면으로 이동합니다!');
    setTimeout(() => navigation.replace('Login'), 1000);
  };

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 처리
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>배우자 초대 코드</Text>
        <TouchableOpacity style={styles.button} onPress={handleInvite}>
          <Text style={styles.linkText}>+ 배우자 초대하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !!spouseId && styles.disabledButton]}
          onPress={handleEnterCode}
          disabled={!!spouseId}
        >
          <Text style={[styles.linkText, !!spouseId && styles.disabledText]}>
            + 초대코드 입력하기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계정 관리</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
          <Text style={[styles.buttonText, styles.signOut]}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay visible={isPending} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.WHITE,
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.BLUE,
    fontSize: 16,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  signOut: {
    color: COLORS.RED,
  },
  disabledButton: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderColor: '#ccc',
  },
  disabledText: {
    color: '#aaa',
  },
});

export default SettingScreen;
