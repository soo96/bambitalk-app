import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { MessageItem, MessageType } from '@/types/chat';
import { groupMessagesWithDateSeparators } from '@/utils/messageUtil';
import DateSeparator from './DateSeparator';
import MessageImage from './MessageImage';
import MessageVideo from './MessageVideo';

interface MessageListProps {
  messages: MessageItem[];
  onEndReached: () => void;
  onPreview: (url: string, type: MessageType) => void;
}

const MessageList = ({
  messages,
  onEndReached,
  onPreview,
}: MessageListProps) => {
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
        ) : item.type === 'TEXT' ? (
          <MessageBubble message={item} />
        ) : item.type === 'IMAGE' ? (
          <MessageImage message={item} onPreview={onPreview} />
        ) : item.type === 'VIDEO' ? (
          <MessageVideo message={item} onPreview={onPreview} />
        ) : null
      }
      contentContainerStyle={{ padding: 16 }}
      inverted={true}
      onEndReached={onEndReached}
    />
  );
};

export default MessageList;
