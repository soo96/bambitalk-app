import COLORS from '@/constants/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { HeartIcon, PlayIcon } from 'lucide-react-native';
import { MessageItem, MessageType } from '@/types/chat';
import { useEffect, useState } from 'react';

interface Props {
  message: MessageItem;
  onPreview: (url: string, type: MessageType) => void;
}

const MessageVideo = ({ message, onPreview }: Props) => {
  const { content: videoUrl, isMe, isRead, time, type } = message;
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    setAspectRatio(16 / 9);
  }, [videoUrl]);

  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <TouchableOpacity onPress={() => onPreview(videoUrl, type)}>
        <Video
          source={{ uri: videoUrl }}
          style={[styles.video, { aspectRatio }]}
          resizeMode="contain"
          paused={true}
          onLoad={(data) => {
            const { width, height } = data.naturalSize;
            if (width && height) {
              setAspectRatio(width / height);
            }
          }}
        />
        <View style={styles.playOverlay}>
          <PlayIcon color={COLORS.WHITE} size={20} />
        </View>
      </TouchableOpacity>
      <View style={styles.timeBoxRight}>
        {isMe && !isRead && (
          <Text style={styles.readCount}>
            <HeartIcon
              color={COLORS.CHAT_PRIMARY}
              size={12}
              fontWeight={'bold'}
            />
          </Text>
        )}
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '70%',
    alignItems: 'flex-end',
  },
  left: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  right: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  video: {
    maxWidth: 250,
    width: '100%',
    borderRadius: 8,
  },
  playOverlay: {
    position: 'absolute',
    top: '45%',
    left: '48%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 30,
    padding: 12,
  },
  timeBoxRight: {
    alignItems: 'flex-end',
  },
  readCount: {
    paddingHorizontal: 5,
  },
  time: {
    fontSize: 12,
    color: COLORS.BLACK_LIGHT,
    marginHorizontal: 5,
  },
});

export default MessageVideo;
