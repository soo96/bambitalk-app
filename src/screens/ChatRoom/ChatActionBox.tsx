import COLORS from '@/constants/colors';
import { SendMessagePayload } from '@/types/chat';
import { CameraIcon, ImageIcon } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface ChatActionBoxProps {
  visible: boolean;
  sendMessage: (payload: SendMessagePayload) => void;
  onClose: () => void;
}

const ChatActionBox = ({
  visible,
  sendMessage,
  onClose,
}: ChatActionBoxProps) => {
  if (!visible) return null;

  const handleOpenGallery = () => {
    onClose();
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('사용자가 선택 취소');
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];

          if (!selectedImage.base64) {
            console.warn('이미지 base64가 없습니다!');
            return;
          }

          const mimeType = selectedImage.type || 'image/jpeg';
          const base64Data = `data:${mimeType};base64,${selectedImage.base64}`;

          sendMessage({
            type: 'IMAGE',
            content: base64Data,
          });
        }
      },
    );
  };

  const handleOpenCamera = () => {
    onClose();
    launchCamera(
      {
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('사용자가 촬영 취소');
        } else if (response.assets && response.assets.length > 0) {
          const capturedImage = response.assets;
          console.log({ capturedImage });
        }
      },
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
