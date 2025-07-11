import COLORS from '@/constants/colors';
import { TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface ScheduleInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: StyleProp<TextStyle>;
}

const ScheduleInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  maxLength,
  autoFocus,
  ...rest
}: ScheduleInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.GRAY_DARK}
      value={value}
      onChangeText={onChangeText}
      style={style}
      maxLength={maxLength}
      autoFocus={autoFocus}
      {...rest}
    />
  );
};

export default ScheduleInput;
