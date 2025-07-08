import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { Message } from '@/types/chat';
import { groupMessagesWithDateSeparators } from '@/utils/messageUtil';
import DateSeparator from './DateSeparator';

interface MessageListProps {
  messages: Message[];
  onEndReached: () => void;
}

const MessageList = ({ messages, onEndReached }: MessageListProps) => {
  const renderItems = groupMessagesWithDateSeparators(messages);
  return (
    <FlatList
      data={renderItems}
      keyExtractor={(item) =>
        item.type === 'date' ? `date-${item.date}` : `msg-${item.id}`
      }
      renderItem={({ item }) =>
        item.type === 'date' ? (
          <DateSeparator date={item.date} />
        ) : (
          <MessageBubble {...item} />
        )
      }
      contentContainerStyle={{ padding: 16 }}
      inverted={true}
      onEndReached={onEndReached}
    />
  );
};

export default MessageList;
