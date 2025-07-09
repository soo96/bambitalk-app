import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import COLORS from '@/constants/colors';

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isThisMonth: boolean;
  hasTasks: boolean;
  hasDadSchedule: boolean;
  hasMomSchedule: boolean;
  onPress: () => void;
}

const DayCell = ({
  date,
  isSelected,
  isToday,
  isThisMonth,
  hasTasks,
  hasDadSchedule,
  hasMomSchedule,
  onPress,
}: DayCellProps) => {
  const day = date.getDate();
  const weekDay = date.getDay();

  const cellStyle = [
    styles.dateBox,
    !isThisMonth && styles.outsideMonth,
    isSelected && styles.selected,
    isToday && styles.today,
  ];

  let textColor = COLORS.BLACK;
  if (weekDay === 0) textColor = COLORS.RED;
  if (weekDay === 6) textColor = COLORS.BLUE;
  if (isToday) textColor = COLORS.WHITE;

  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <View style={cellStyle}>
        <Text style={[styles.dateText, { color: textColor }]}>{day}</Text>
      </View>
      <View style={styles.emojiContainer}>
        {hasDadSchedule && <Text style={styles.emoji}>💙</Text>}
        {hasMomSchedule && <Text style={styles.emoji}>🩷</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: 2,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
  },
  dateBox: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
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
  dateText: {
    fontSize: 14,
  },
  emojiContainer: {
    height: 20,
    marginTop: 5,
    flexDirection: 'row',
    gap: 2,
  },
  emoji: {
    fontSize: 14,
  },
});

export default DayCell;
