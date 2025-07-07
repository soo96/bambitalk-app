import { FlatList, View } from 'react-native';
import MessageBubble from './MessageBubble';

const dummyMessages = [
  { id: '1', text: '오늘 몇시에 와?', isMe: false, time: '오후 4:21' },
  { id: '2', text: '7시쯤?', isMe: true, time: '오후 4:28' },
  { id: '3', text: 'ㅇㅋ', isMe: false, time: '오후 4:35' },
  {
    id: '4',
    text: '그래?? 오늘 바로 퇴근하는거 아니야?',
    isMe: false,
    time: '오후 4:35',
  },
];

const MessageList = () => {
  return (
    <FlatList
      data={dummyMessages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageBubble text={item.text} isMe={item.isMe} time={item.time} />
      )}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default MessageList;
