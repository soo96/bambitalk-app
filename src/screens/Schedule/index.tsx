import { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import COLORS from '@/constants/colors';
import { addMonths, subMonths } from 'date-fns';
import CalendarMonth from './CalendarMonth';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ScheduleScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const monthList = useMemo(() => {
    return [
      subMonths(currentMonth, 1),
      currentMonth,
      addMonths(currentMonth, 1),
    ];
  }, [currentMonth]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / e.nativeEvent.layoutMeasurement.width);

    if (index === 0) {
      setCurrentMonth(subMonths(currentMonth, 1));
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
    } else if (index === 2) {
      setCurrentMonth(addMonths(currentMonth, 1));
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
    }
  };

  const handlePressToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
    flatListRef.current?.scrollToIndex({ index: 1, animated: false });
  };

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: COLORS.WHITE,
      }}
      ref={flatListRef}
      data={monthList}
      horizontal
      pagingEnabled
      initialScrollIndex={1}
      getItemLayout={(_, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index,
      })}
      keyExtractor={(item) => item.toISOString()}
      renderItem={({ item }) => (
        <CalendarMonth
          monthDate={item}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScrollEnd}
    />
  );
};

export default ScheduleScreen;
