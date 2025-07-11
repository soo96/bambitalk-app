import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScheduleItem } from '@/types/schedule';
import ScheduleListItem from './ScheduleListItem';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import COLORS from '@/constants/colors';

interface Props {
  visible: boolean;
  date: Date | null;
  schedules: ScheduleItem[];
  onClose: () => void;
  onPressAdd: () => void;
  onPressItem?: (item: ScheduleItem) => void;
}

const ScheduleListModal = ({
  visible,
  date,
  schedules,
  onClose,
  onPressAdd,
  onPressItem,
}: Props) => {
  if (!visible || !date) return null;

  const title = format(date, 'MM월 dd일 (E)', { locale: ko });

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <Text style={styles.dateTitle}>{title}</Text>

        <FlatList
          data={schedules}
          keyExtractor={(item) => item.scheduleId.toString()}
          renderItem={({ item }) => (
            <ScheduleListItem
              time={item.time}
              title={item.title}
              description={item.description}
              color={item.color}
              isCompleted={item.isCompleted}
              onToggle={() => {
                // TODO: 완료 상태 토글
              }}
              onPress={() => onPressItem?.(item)}
            />
          )}
          style={{ height: 300 }}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.addBtn} onPress={onPressAdd}>
          <Text style={styles.addText}>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    width: '80%',
  },
  dateTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  addBtn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 10,
  },
  addText: {
    fontSize: 16,
    color: COLORS.BLACK_LIGHT,
  },
});

export default ScheduleListModal;
