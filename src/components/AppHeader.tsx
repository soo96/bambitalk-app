import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type AppHeaderProps = {
  title: string;
  onLeftPress?: () => void;
  leftIcon?: React.ReactNode;
  onRightPress?: () => void;
  rightIcon?: React.ReactNode;
};

const AppHeader = ({
  title,
  onLeftPress,
  leftIcon,
  onRightPress,
  rightIcon,
}: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress}>{leftIcon}</TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.side}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  side: {
    width: 40,
    alignItems: 'center',
  },
});

export default AppHeader;
