import { View, Text, StyleSheet } from 'react-native';

const days = ['월', '화', '수', '목', '금', '토', '일'];

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
    color: '#444',
  },
});

export default CalendarDaysHeader;
