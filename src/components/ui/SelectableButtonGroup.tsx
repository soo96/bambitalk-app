import COLORS from '@/constants/colors';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const SelectableButtonGroup = ({ options, selected, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      {options.map(({ label, value }) => (
        <TouchableOpacity
          key={value}
          style={[styles.button, selected === value && styles.buttonSelected]}
          onPress={() => onSelect(value)}
        >
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.TEXT_PRIMARY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: COLORS.SECONDARY,
  },
  label: {
    color: COLORS.TEXT_PRIMARY,
  },
});

export default SelectableButtonGroup;
