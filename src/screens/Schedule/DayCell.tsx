import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '@/constants/colors';

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isThisMonth: boolean;
  hasTasks: boolean;
  onPress: () => void;
}

const DayCell = ({
  date,
  isSelected,
  isToday,
  isThisMonth,
  hasTasks,
  onPress,
}: DayCellProps) => {
  const day = date.getDate();
  const weekDay = date.getDay();

  const cellStyle = [
    styles.cell,
    !isThisMonth && styles.outsideMonth,
    isSelected && styles.selected,
    isToday && styles.today,
  ];

  let textColor = COLORS.BLACK;
  if (weekDay === 0) textColor = COLORS.RED;
  if (weekDay === 6) textColor = COLORS.BLUE;
  if (isToday) textColor = COLORS.WHITE;

  return (
    <TouchableOpacity style={cellStyle} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{day}</Text>
      {hasTasks && <Text style={styles.taskDot}>✅</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 2,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
  },
  outsideMonth: {
    opacity: 0.3,
  },
  selected: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 10,
  },
  today: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
  },
  taskDot: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default DayCell;
