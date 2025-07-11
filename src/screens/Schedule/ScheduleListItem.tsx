import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '@/constants/colors';
import {
  DeleteScheduleParams,
  ScheduleItem,
  UpdateScheduleDto,
} from '@/types/schedule';
import { Square, SquareCheck } from 'lucide-react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface Props {
  schedule: ScheduleItem;
  onToggle: (data: UpdateScheduleDto) => void;
  onPressItem: () => void;
  onPressDelete: (params: DeleteScheduleParams) => void;
}

const ScheduleListItem = ({ schedule, onToggle, onPressItem }: Props) => {
  const { scheduleId, title, description, time, color, isCompleted } = schedule;

  const handleToggle = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });

    onToggle({ scheduleId, isCompleted: !isCompleted });
  };

  return (
    <View style={styles.backdrop}>
      <TouchableOpacity
        onPress={onPressItem}
        activeOpacity={0.8}
        style={[
          styles.container,
          { backgroundColor: COLORS.PASTEL[color] },
          isCompleted && styles.completedContainer,
        ]}
      >
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, isCompleted && styles.completedText]}>
            {title}
          </Text>
          <Text
            style={[styles.description, isCompleted && styles.completedText]}
          >
            {description}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleToggle}
          style={styles.checkboxContainer}
        >
          {isCompleted ? (
            <SquareCheck size={25} color={COLORS.BLACK_LIGHT} />
          ) : (
            <Square size={25} color={COLORS.BLACK_LIGHT} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  completedContainer: {
    opacity: 0.6,
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
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScheduleListItem;
