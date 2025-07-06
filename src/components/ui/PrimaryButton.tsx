import COLORS from '@/constants/colors';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  DimensionValue,
} from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  width?: DimensionValue;
}

export default function PrimaryButton({
  label,
  onPress,
  disabled,
  width = '70%',
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { width }, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.SECONDARY,
  },
  label: {
    fontSize: 16,
  },
  disabled: {
    backgroundColor: COLORS.WHITE,
    opacity: 0.5,
  },
});
