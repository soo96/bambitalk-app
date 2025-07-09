import AppHeader from '@/components/AppHeader';
import COLORS from '@/constants/colors';
import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

type Props = {
  children: ReactNode;
  headerTitle?: string;
  onLeftPress?: () => void;
  leftIcon?: ReactNode;
  onRightPress?: () => void;
  rightIcon?: ReactNode;
};

const DefaultLayout = ({
  children,
  headerTitle = 'BambiTalk',
  onLeftPress,
  leftIcon,
  onRightPress,
  rightIcon,
}: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title={headerTitle}
        onLeftPress={onLeftPress}
        leftIcon={leftIcon}
        onRightPress={onRightPress}
        rightIcon={rightIcon}
      />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flex: 1,
  },
});

export default DefaultLayout;
