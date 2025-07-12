import COLORS from '@/constants/colors';
import { COLOR, Color } from '@/types/color';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface ScheduleColorPickerProps {
  selectedColor: Color;
  onSelect: (color: Color) => void;
}

const ScheduleColorPicker = ({
  selectedColor,
  onSelect,
}: ScheduleColorPickerProps) => {
  const pastelColors = Object.values(COLOR);

  return (
    <View style={styles.colorRow}>
      {pastelColors.map((c) => (
        <TouchableOpacity
          key={c}
          style={[
            styles.colorCircle,
            { backgroundColor: COLORS.PASTEL[c] },
            c === selectedColor && styles.selectedCircle,
          ]}
          onPress={() => onSelect(c)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  colorRow: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 8,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: COLORS.BLACK_LIGHT,
  },
});

export default ScheduleColorPicker;
