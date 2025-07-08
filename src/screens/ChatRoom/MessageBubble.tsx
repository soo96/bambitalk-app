import COLORS from '@/constants/colors';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
  isMe: boolean;
  time: string;
}

const MessageBubble = ({ text, isMe, time }: Props) => {
  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <View
        style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}
      >
        <Text>{text}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
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
  },
  bubbleRight: {
    backgroundColor: COLORS.CHAT_PRIMARY,
  },
  time: {
    fontSize: 12,
    color: COLORS.BLACK_LIGHT,
    marginHorizontal: 5,
  },
});

export default MessageBubble;
