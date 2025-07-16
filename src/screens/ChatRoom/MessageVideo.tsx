import COLORS from '@/constants/colors';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { HeartIcon } from 'lucide-react-native';
import { MessageItem } from '@/types/chat';
import { useEffect, useState } from 'react';

interface Props {
  message: MessageItem;
}

const MessageVideo = ({ message }: Props) => {
  const { content: videoUrl, isMe, isRead, time } = message;
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    setAspectRatio(16 / 9);
  }, [videoUrl]);

  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <View style={styles.bubble}>
        <Video
          source={{ uri: videoUrl }}
          style={[styles.video, { aspectRatio }]}
          resizeMode="contain"
          paused={true}
          controls={true}
        />
      </View>
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
  bubble: {
    padding: 2,
    borderRadius: 10,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  video: {
    width: 250,
    borderRadius: 8,
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
