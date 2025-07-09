import { View, Dimensions } from 'react-native';
import MonthTitle from './MonthTitle';
import CalendarBody from './CalendarBody';
import CalendarDaysHeader from './CalendarDaysHeader';

interface CalendarMonthProps {
  monthDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const CalendarMonth = ({
  monthDate,
  selectedDate,
  onSelectDate,
}: CalendarMonthProps) => {
  return (
    <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 16 }}>
      <MonthTitle date={monthDate} />
      <CalendarDaysHeader />
      <CalendarBody
        currentMonth={monthDate}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      />
    </View>
  );
};

export default CalendarMonth;
