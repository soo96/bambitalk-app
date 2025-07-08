import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MonthTitle from './MonthTitle';
import CalendarDaysHeader from './CalendarDaysHeader';
import CalendarBody from './CalendarBody';
import COLORS from '@/constants/colors';

const ScheduleScreen = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <View style={styles.content}>
      <MonthTitle date={currentMonth} />
      <CalendarDaysHeader />
      <CalendarBody
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: COLORS.WHITE,
  },
});

export default ScheduleScreen;
