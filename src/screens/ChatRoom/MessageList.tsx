import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { MessageItem, MessageType } from '@/types/chat';
import { groupMessagesWithDateSeparators } from '@/utils/messageUtil';
import DateSeparator from './DateSeparator';
import MessageImage from './MessageImage';
import MessageVideo from './MessageVideo';
import ProgressBubble from './ProgressBubble';

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
      renderItem={({ item }) => {
        if (item.type === 'DATE') {
          return <DateSeparator date={item.date} />;
        }
        if (item.id.startsWith('fake-')) {
          return <ProgressBubble message={item} />;
        }
        switch (item.type) {
          case 'TEXT':
            return <MessageBubble message={item} />;
          case 'IMAGE':
            return <MessageImage message={item} onPreview={onPreview} />;
          case 'VIDEO':
            return <MessageVideo message={item} onPreview={onPreview} />;
          default:
            return null;
        }
      }}
      contentContainerStyle={{ padding: 16 }}
      inverted={true}
      onEndReached={onEndReached}
    />
  );
};

export default MessageList;
