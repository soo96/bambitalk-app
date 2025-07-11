import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import COLORS from '@/constants/colors';
import { addMonths, subMonths, format } from 'date-fns';
import CalendarMonth from './CalendarMonth';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '@/types/navigation';
import { useSchedulesByYearMonthQuery } from '@/hooks/useSchedulesQuery';
import {
  CreateScheduleDto,
  DeleteScheduleParams,
  ScheduleItem,
  UpdateScheduleDto,
} from '@/types/schedule';
import ScheduleListModal from './ScheduleListModal';
import ScheduleDetailModal from './ScheduleDetailModal';
import { useCreateScheduleMutation } from '@/hooks/useCreateScheduleMutation';
import { useUpdateScheduleMutation } from '@/hooks/useUpdateScheduleMutation';
import { useDeleteScheduleMutation } from '@/hooks/useDeleteScheduleMutation';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ScheduleScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isListModalVisible, setIsListModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  );
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const monthList = useMemo(() => {
    return [
      subMonths(currentMonth, 1),
      currentMonth,
      addMonths(currentMonth, 1),
    ];
  }, [currentMonth]);

  const { data: schedules } = useSchedulesByYearMonthQuery(currentMonth);
  const createScheduleMutation = useCreateScheduleMutation();
  const updateScheduleMutation = useUpdateScheduleMutation();
  const deleteScheduleMutation = useDeleteScheduleMutation();

  const schedulesByDateMap = useMemo(() => {
    const map: Record<string, ScheduleItem[]> = {};

    schedules?.forEach(({ date, schedules }) => {
      map[date] = schedules;
    });

    return map;
  }, [schedules]);

  const key = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const todaysSchedules = schedulesByDateMap[key] || [];

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

  const handleOpenScheduleListModal = (date: Date) => {
    setSelectedDate(date);
    setIsListModalVisible(true);
  };

  const handleCloseScheduleListModal = () => {
    setIsListModalVisible(false);
  };

  const handleOpenDetailModalForNew = () => {
    setSelectedSchedule(null);
    setIsDetailModalVisible(true);
  };

  const handleOpenDetailModalForEdit = (schedule: ScheduleItem) => {
    setSelectedSchedule(schedule);
    setIsDetailModalVisible(true);
  };

  const handleCloseScheduleDetailModal = () => {
    setIsDetailModalVisible(false);
  };

  const handleSaveSchedule = async (
    data: CreateScheduleDto | UpdateScheduleDto,
  ) => {
    if (selectedSchedule) {
      await updateScheduleMutation.mutateAsync(data as UpdateScheduleDto);
    } else {
      await createScheduleMutation.mutateAsync(data as CreateScheduleDto);
    }
  };

  const handleToggleCheckBox = async (data: UpdateScheduleDto) => {
    await updateScheduleMutation.mutateAsync(data);
  };

  const handleDeleteSchedule = async ({ scheduleId }: DeleteScheduleParams) => {
    const yearMonth = format(selectedDate!, 'yyyy-MM');

    await deleteScheduleMutation.mutateAsync({ scheduleId, yearMonth });
  };

  useEffect(() => {
    return navigation.addListener('tabPress', handlePressToday);
  });

  return (
    <>
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
            onSelectDate={handleOpenScheduleListModal}
            schedulesByDateMap={schedulesByDateMap}
          />
        )}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      />
      {isListModalVisible && (
        <ScheduleListModal
          visible={isListModalVisible}
          date={selectedDate}
          schedules={todaysSchedules}
          onClose={handleCloseScheduleListModal}
          onPressAdd={handleOpenDetailModalForNew}
          onToggleCheckBox={handleToggleCheckBox}
          onPressItem={handleOpenDetailModalForEdit}
        />
      )}

      {isDetailModalVisible && (
        <ScheduleDetailModal
          date={selectedDate}
          schedule={selectedSchedule}
          onSave={handleSaveSchedule}
          onClose={handleCloseScheduleDetailModal}
        />
      )}
    </>
  );
};

export default ScheduleScreen;
