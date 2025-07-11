import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  DeleteScheduleParams,
  ScheduleItem,
  UpdateScheduleDto,
} from '@/types/schedule';
import ScheduleListItem from './ScheduleListItem';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import COLORS from '@/constants/colors';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Trash2 } from 'lucide-react-native';

interface Props {
  visible: boolean;
  date: Date | null;
  schedules: ScheduleItem[];
  onClose: () => void;
  onPressAdd: () => void;
  onToggleCheckBox: (data: UpdateScheduleDto) => void;
  onPressItem: (item: ScheduleItem) => void;
  onPressDelete: (params: DeleteScheduleParams) => void;
}

const ScheduleListModal = ({
  visible,
  date,
  schedules,
  onClose,
  onPressAdd,
  onToggleCheckBox,
  onPressItem,
  onPressDelete,
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

        <SwipeListView
          data={schedules}
          keyExtractor={(item) => item.scheduleId.toString()}
          renderItem={({ item }) => (
            <ScheduleListItem
              schedule={item}
              onToggle={onToggleCheckBox}
              onPressItem={() => onPressItem(item)}
              onPressDelete={onPressDelete}
            />
          )}
          renderHiddenItem={({ item }: { item: ScheduleItem }) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onPressDelete({ scheduleId: item.scheduleId })}
              >
                <Trash2 color={COLORS.WHITE} />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
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
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    marginBottom: 10,
  },
  deleteButton: {
    width: 60,
    height: '100%',
    borderRadius: 12,
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
});

export default ScheduleListModal;
