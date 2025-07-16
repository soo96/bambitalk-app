import COLORS from '@/constants/colors';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HeartIcon } from 'lucide-react-native';
import { MessageItem, MessageType } from '@/types/chat';
import { useEffect, useState } from 'react';

interface Props {
  message: MessageItem;
  onPreview: (url: string, type: MessageType) => void;
}

const MessageImage = ({ message, onPreview }: Props) => {
  const { content: imageUrl, isMe, isRead, time, type } = message;
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
      <TouchableOpacity onPress={() => onPreview(imageUrl, type)}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { aspectRatio }]}
          resizeMode="contain"
        />
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
