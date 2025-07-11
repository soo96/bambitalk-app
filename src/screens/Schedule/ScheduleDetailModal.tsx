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
import { ScheduleItem } from '@/types/schedule';
import { format } from 'date-fns';
import COLORS from '@/constants/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  date: Date | null;
  schedule: ScheduleItem | null;
  onClose: (saved?: boolean) => void;
  onSave: (data: Partial<ScheduleItem>) => void;
}

export default function ScheduleDetailModal({
  date,
  schedule,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [color, setColor] = useState('#FF5733');
  const [time, setTime] = useState('00:00');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const pastelColors = Object.values(COLORS.SCHEDULE);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title || '');
      setMemo(schedule.description || '');
      setColor(schedule.color || pastelColors[0]);
      setTime(schedule.time || '00:00');
    } else {
      setTitle('');
      setMemo('');
      setColor(pastelColors[0]);
      setTime('00:00');
    }

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!date) return null;

  const handleConfirmTime = (pickedDate: Date) => {
    const formatted = format(pickedDate, 'HH:mm');
    setTime(formatted);
    setTimePickerVisible(false);
  };

  const handleCloseAndSave = () => {
    onSave({
      scheduleId: schedule?.scheduleId,
      title,
      description: memo,
      color,
      date: format(date, 'yyyy-MM-dd'),
      time,
    });
    onClose(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={109}
      style={styles.keyboardAvoiding}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={handleCloseAndSave}>
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

            <View style={styles.colorRow}>
              {pastelColors.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c },
                    c === color && styles.selectedCircle,
                  ]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>
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

          <TextInput
            placeholder="제목을 입력하세요"
            placeholderTextColor={COLORS.GRAY_DARK}
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
            maxLength={20}
            autoFocus
          />

          <TextInput
            placeholder="메모를 입력하세요"
            placeholderTextColor={COLORS.GRAY_DARK}
            value={memo}
            onChangeText={setMemo}
            style={[styles.descriptionInput]}
            maxLength={28}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

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
  colorRow: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 8,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: COLORS.BLACK_LIGHT,
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
