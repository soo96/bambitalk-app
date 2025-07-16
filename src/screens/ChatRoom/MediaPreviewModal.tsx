import { Modal, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { X } from 'lucide-react-native';
import COLORS from '@/constants/colors';
import { MessageType } from '@/types/chat';

interface Props {
  visible: boolean;
  url: string;
  type: MessageType;
  onClose: () => void;
}

const MediaPreviewModal = ({ visible, url, type, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X color={COLORS.WHITE} size={28} />
        </TouchableOpacity>

        {type === 'IMAGE' ? (
          <Image
            source={{ uri: url }}
            style={styles.media}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{ uri: url }}
            style={styles.media}
            resizeMode="contain"
            controls
            paused={false}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 1,
  },
});

export default MediaPreviewModal;
