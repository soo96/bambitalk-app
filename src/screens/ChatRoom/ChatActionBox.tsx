import { postFile } from '@/apis/file';
import COLORS from '@/constants/colors';
import { SendMessagePayload } from '@/types/chat';
import { CameraIcon, ImageIcon } from 'lucide-react-native';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';

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
      handleUploadFile,
    );
  };

  const handleOpenCamera = () => {
    onClose();
    launchCamera(
      {
        mediaType: 'photo',
        presentationStyle: 'popover',
      },
      handleUploadFile,
    );
  };

  const handleUploadFile = async (response: any) => {
    if (!response.assets || response.assets.length === 0) return;

    const fileAsset = response.assets[0];

    const resizedImage = await ImageResizer.createResizedImage(
      fileAsset.uri!,
      1024,
      1024,
      'JPEG',
      70,
    );

    const formData = new FormData();
    formData.append('file', {
      uri:
        Platform.OS === 'ios'
          ? resizedImage.uri?.replace('file://', '')
          : resizedImage.uri,
      name: resizedImage.name ?? 'photo.jpg',
      type: fileAsset.type ?? 'image/jpeg',
    });

    try {
      const data = await postFile(formData);
      sendMessage({
        type: fileAsset.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
        content: data.fileUrl,
      });
    } catch (error) {
      console.error('파일 업로드 실패:', error);
    }
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
