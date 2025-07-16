import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import { X } from 'lucide-react-native';
import COLORS from '@/constants/colors';
import { MessageType } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  url: string;
  type: MessageType;
  onClose: () => void;
}

const MediaPreviewModal = ({ visible, url, type, onClose }: Props) => {
  const [controlsVisible, setControlsVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const toggleControls = () => {
    const toValue = controlsVisible ? 0 : 1;
    setControlsVisible(!controlsVisible);
    Animated.timing(opacity, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!visible) {
      setControlsVisible(false);
      opacity.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[styles.topBar, { paddingTop: insets.top + 10, opacity }]}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color={COLORS.WHITE} size={28} />
            </TouchableOpacity>
          </Animated.View>

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
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    padding: 8,
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default MediaPreviewModal;
