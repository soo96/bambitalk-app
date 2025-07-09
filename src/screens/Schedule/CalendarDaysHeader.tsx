import COLORS from '@/constants/colors';
import { View, Text, StyleSheet } from 'react-native';

const days = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarDaysHeader = () => {
  return (
    <View style={styles.container}>
      {days.map((day) => (
        <Text key={day} style={styles.day}>
          {day}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  day: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.GRAY_DARK,
    fontWeight: 'semibold',
    borderRadius: 50,
    marginHorizontal: 8,
    paddingVertical: 10,
  },
});

export default CalendarDaysHeader;
