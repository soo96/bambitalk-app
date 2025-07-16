import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import { X, Download } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import COLORS from '@/constants/colors';
import { MessageType } from '@/types/chat';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { fromByteArray } from 'base64-js';

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
    setControlsVisible(!controlsVisible);
  };

  useEffect(() => {
    if (!visible) {
      setControlsVisible(false);
      opacity.setValue(0);
    }
  }, [visible, opacity]);

  const handleDownload = async () => {
    try {
      const fileExt = type === 'VIDEO' ? 'mp4' : 'jpg';
      const fileName = `bambi_${Date.now()}.${fileExt}`;
      const downloadPath =
        Platform.OS === 'ios'
          ? `${RNFS.TemporaryDirectoryPath}${fileName}`
          : `${RNFS.CachesDirectoryPath}/${fileName}`;

      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const base64String = fromByteArray(new Uint8Array(response.data));
      const fileUri = `file://${downloadPath}`;

      await RNFS.writeFile(downloadPath, base64String, 'base64');

      await CameraRoll.saveAsset(fileUri, {
        type: type === 'VIDEO' ? 'video' : 'photo',
      });

      Alert.alert('다운로드 완료', '갤러리에 저장되었습니다.');
    } catch (err) {
      console.error('다운로드 실패:', err);
      Alert.alert('실패', '파일을 저장하는 중 문제가 발생했습니다.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[styles.topBar, { paddingTop: insets.top + 10, opacity }]}
          >
            <TouchableOpacity
              onPress={handleDownload}
              style={styles.iconButton}
            >
              <Download color={COLORS.WHITE} size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
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
    backgroundColor: COLORS.BLACK,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    zIndex: 10,
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default MediaPreviewModal;
