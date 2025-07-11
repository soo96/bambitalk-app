import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  CreateScheduleDto,
  ScheduleItem,
  UpdateScheduleDto,
} from '@/types/schedule';
import { format } from 'date-fns';
import COLORS from '@/constants/colors';
import ScheduleInput from './ScheduleInput';
import { COLOR, Color } from '@/types/color';
import ScheduleColorPicker from './ScheduleColorPicker';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  date: Date | null;
  schedule: ScheduleItem | null;
  onClose: (saved?: boolean) => void;
  onSave: (data: CreateScheduleDto | UpdateScheduleDto) => void;
}

const ScheduleDetailModal = ({ date, schedule, onSave, onClose }: Props) => {
  if (!date) return null;

  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [color, setColor] = useState<Color>(COLOR.YELLOW);
  const [time, setTime] = useState('00:00');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleConfirmTime = (pickedDate: Date) => {
    const formatted = format(pickedDate, 'HH:mm');
    setTime(formatted);
    setTimePickerVisible(false);
  };

  const handleCloseAndSave = () => {
    const data = {
      title,
      description: memo,
      color,
      date: date.toISOString(),
    };

    if (schedule) {
      onSave({
        ...data,
        scheduleId: schedule.scheduleId,
      });
    } else {
      onSave(data);
    }

    onClose(true);
  };

  const handlePressBackdrop = () => {
    if (schedule || isDirty) {
      handleCloseAndSave();
    }

    onClose(false);
  };

  const handleSelectColor = (color: Color) => {
    setColor(color);
  };

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title || '');
      setMemo(schedule.description || '');
      setColor(COLOR[schedule.color]);
      setTime(schedule.time || '00:00');
    } else {
      setTitle('');
      setMemo('');
      setColor(COLOR.YELLOW);
      setTime('00:00');
    }
  }, []);

  useEffect(() => {
    if (
      title !== '' ||
      memo !== '' ||
      time !== '00:00' ||
      color !== COLOR.YELLOW
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [title, memo, time, color]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={109}
      style={styles.keyboardAvoiding}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={handlePressBackdrop}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={[styles.container]}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => setTimePickerVisible(true)}
              style={styles.timePickerBtn}
            >
              <Text style={styles.timePickerText}>🕒 {time}</Text>
            </TouchableOpacity>

            <ScheduleColorPicker
              onSelect={handleSelectColor}
              selectedColor={color}
            />
          </View>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            locale="ko-KR"
            date={date}
            onConfirm={handleConfirmTime}
            onCancel={() => setTimePickerVisible(false)}
            minuteInterval={30}
          />

          <ScheduleInput
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
            maxLength={20}
            autoFocus
          />

          <ScheduleInput
            placeholder="메모를 입력하세요"
            value={memo}
            onChangeText={setMemo}
            style={styles.descriptionInput}
            maxLength={28}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoiding: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    zIndex: 9999,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timePickerBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 8,
  },
  timePickerText: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 18,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
});

export default ScheduleDetailModal;
