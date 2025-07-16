import COLORS from '@/constants/colors';
import { CameraIcon, ImageIcon } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface ChatActionBoxProps {
  visible: boolean;
  onUploadFile: (response: any) => void;
  onClose: () => void;
}

const ChatActionBox = ({
  visible,
  onUploadFile,
  onClose,
}: ChatActionBoxProps) => {
  if (!visible) return null;

  const handleOpenGallery = () => {
    onClose();
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
        includeBase64: true,
      },
      onUploadFile,
    );
  };

  const handleOpenCamera = () => {
    onClose();
    launchCamera(
      {
        mediaType: 'photo',
        presentationStyle: 'popover',
      },
      onUploadFile,
    );
  };

  return (
    <View style={styles.actionBox}>
      <TouchableOpacity style={styles.actionItem} onPress={handleOpenGallery}>
        <View style={styles.actionIcon}>
          <ImageIcon />
        </View>
        <Text style={styles.actionText}>앨범</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={handleOpenCamera}>
        <View style={styles.actionIcon}>
          <CameraIcon />
        </View>
        <Text style={styles.actionText}>카메라</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBox: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
  },
  actionItem: {
    marginVertical: 10,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: COLORS.CHAT_SECONDARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 11,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: COLORS.TEXT_PRIMARY,
  },
});

export default ChatActionBox;
