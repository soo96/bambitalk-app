import COLORS from '@/constants/colors';
import { View, Text, StyleSheet } from 'react-native';
import { Bold, HeartIcon } from 'lucide-react-native';
import { MessageItem } from '@/types/chat';

interface Props {
  message: MessageItem;
}

const MessageBubble = ({ message }: Props) => {
  const { content, isMe, isRead, time } = message;
  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <View
        style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}
      >
        <Text>{content}</Text>
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
    padding: 10,
    borderRadius: 10,
  },
  bubbleLeft: {
    backgroundColor: COLORS.CHAT_SECONDARY,
    borderTopLeftRadius: 0,
  },
  bubbleRight: {
    backgroundColor: COLORS.CHAT_PRIMARY,
    borderTopRightRadius: 0,
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

export default MessageBubble;
