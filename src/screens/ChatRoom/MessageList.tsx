import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { MessageItem } from '@/types/chat';
import { groupMessagesWithDateSeparators } from '@/utils/messageUtil';
import DateSeparator from './DateSeparator';

interface MessageListProps {
  messages: MessageItem[];
  onEndReached: () => void;
}

const MessageList = ({ messages, onEndReached }: MessageListProps) => {
  const renderItems = groupMessagesWithDateSeparators(messages);

  return (
    <FlatList
      data={renderItems}
      keyExtractor={(item) =>
        item.type === 'DATE' ? `date-${item.date}` : `msg-${item.id}`
      }
      renderItem={({ item }) =>
        item.type === 'DATE' ? (
          <DateSeparator date={item.date} />
        ) : (
          <MessageBubble message={item} />
        )
      }
      contentContainerStyle={{ padding: 16 }}
      inverted={true}
      onEndReached={onEndReached}
    />
  );
};

export default MessageList;
