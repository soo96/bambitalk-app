import COLORS from '@/constants/colors';
import { TextInput, StyleSheet, DimensionValue } from 'react-native';

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  status?: 'default' | 'error' | 'success';
}

export default function InputField({
  placeholder,
  value,
  onChangeText,
  status,
}: Props) {
  return (
    <TextInput
      style={[
        styles.input,
        status === 'error' && styles.inputError,
        status === 'success' && styles.inputSuccess,
      ]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.GRAY_DARK}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.TEXT_PRIMARY,
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: COLORS.ERROR,
  },
  inputSuccess: {
    borderColor: COLORS.SUCCESS,
  },
});
