import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageBubble text={item.text} isMe={item.isMe} time={item.time} />
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default MessageList;
