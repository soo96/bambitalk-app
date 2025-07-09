import { View, Dimensions, StyleSheet } from 'react-native';
import MonthTitle from './MonthTitle';
import CalendarBody from './CalendarBody';
import CalendarDaysHeader from './CalendarDaysHeader';
import { ScheduleItem } from '@/types/schedule';

interface CalendarMonthProps {
  monthDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  schedulesByDateMap: Record<string, ScheduleItem[]>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const CalendarMonth = ({
  monthDate,
  selectedDate,
  onSelectDate,
  schedulesByDateMap,
}: CalendarMonthProps) => {
  return (
    <View style={styles.container}>
      <MonthTitle date={monthDate} />
      <CalendarDaysHeader />
      <CalendarBody
        currentMonth={monthDate}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        schedulesByDateMap={schedulesByDateMap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
  },
});

export default CalendarMonth;
