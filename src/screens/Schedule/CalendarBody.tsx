import { View, StyleSheet } from 'react-native';
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from 'date-fns';
import DayCell from './DayCell';
import COLORS from '@/constants/colors';
import { ScheduleItem } from '@/types/schedule';

interface CalendarBodyProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  schedulesByDateMap: Record<string, ScheduleItem[]>;
}

const CalendarBody = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  schedulesByDateMap,
}: CalendarBodyProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  // console.log({ schedulesByDateMap });

  return (
    <View style={styles.grid}>
      {days.map((day) => {
        const isSelected = selectedDate?.toDateString() === day.toDateString();
        const isToday = new Date().toDateString() === day.toDateString();
        const isThisMonth = day.getMonth() === currentMonth.getMonth();

        const dateKey = format(day, 'yyyy-MM-dd');
        const schedules = schedulesByDateMap[dateKey] ?? [];
        const hasTasks = schedules.length > 0;
        const hasDadSchedule = schedules.some((s) => s.creatorRole === 'DAD');
        const hasMomSchedule = schedules.some((s) => s.creatorRole === 'MOM');

        return (
          <DayCell
            key={day.toISOString()}
            date={day}
            isSelected={isSelected}
            isToday={isToday}
            isThisMonth={isThisMonth}
            hasTasks={hasTasks}
            hasDadSchedule={hasDadSchedule}
            hasMomSchedule={hasMomSchedule}
            onPress={() => onSelectDate(day)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_LIGHT,
  },
});

export default CalendarBody;
