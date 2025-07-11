import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '@/constants/colors';

interface Props {
  time: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  onToggle: () => void;
  onPress?: () => void;
}

const ScheduleListItem = ({
  time,
  title,
  description,
  isCompleted,
  onToggle,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, isCompleted && styles.completedContainer]}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>
          {title}
        </Text>
        {description ? (
          <Text
            style={[styles.description, isCompleted && styles.completedText]}
          >
            {description}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
        <View
          style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SCHEDULE.PASTEL_YELLOW,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  completedContainer: {
    opacity: 0.4,
  },
  timeContainer: {
    width: 50,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: COLORS.BLACK,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  description: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 12,
    height: 12,
  },
  checkboxChecked: {
    backgroundColor: COLORS.BLACK_LIGHT,
  },
});

export default ScheduleListItem;
