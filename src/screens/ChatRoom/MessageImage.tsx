import COLORS from '@/constants/colors';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeartIcon } from 'lucide-react-native';
import { MessageItem } from '@/types/chat';
import { useEffect, useState } from 'react';

interface Props {
  message: MessageItem;
}

const MessageImage = ({ message }: Props) => {
  const { content: imageUrl, isMe, isRead, time } = message;
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (imageUrl) {
      Image.getSize(imageUrl, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [imageUrl]);
  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <View style={styles.bubble}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { aspectRatio }]}
          resizeMode="contain"
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
  image: {
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

export default MessageImage;
