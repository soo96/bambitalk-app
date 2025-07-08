import COLORS from '@/constants/colors';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isThisMonth: boolean;
  onPress: () => void;
}

const DayCell = ({
  date,
  isSelected,
  isToday,
  isThisMonth,
  onPress,
}: DayCellProps) => {
  const day = date.getDate();

  const cellStyle = [
    styles.cell,
    !isThisMonth && styles.outsideMonth,
    isSelected && styles.selected,
    isToday && styles.today,
  ];

  const textColor = isToday ? COLORS.WHITE : COLORS.BLACK;

  return (
    <TouchableOpacity style={cellStyle} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{day}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 2,
    paddingVertical: 10,
    borderRadius: 10,
  },
  outsideMonth: {
    opacity: 0.3,
  },
  selected: {
    borderWidth: 1,
    borderColor: COLORS.CHAT_PRIMARY,
    borderRadius: 10,
  },
  today: {
    borderWidth: 1,
    borderColor: COLORS.CHAT_PRIMARY,
    backgroundColor: COLORS.CHAT_PRIMARY,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
  },
});

export default DayCell;
