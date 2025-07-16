import {
  MessageItem,
  MessageType,
  ReceiveMessageDto,
  RenderItem,
} from '@/types/chat';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatMessage = (
  message: ReceiveMessageDto,
  userId: number,
): MessageItem => {
  const sentAtDate = new Date(message.sentAt);

  return {
    ...message,
    id: message.id.toString(),
    isMe: userId === message.senderId,
    date: format(sentAtDate, 'yyyy.MM.dd', { locale: ko }),
    time: format(sentAtDate, 'a h:mm', { locale: ko }),
  };
};

export const formatMessageList = (
  messages: ReceiveMessageDto[],
  userId: number,
) => {
  return messages.map((msg) => formatMessage(msg, userId));
};

export const groupMessagesWithDateSeparators = (messages: MessageItem[]) => {
  const result: RenderItem[] = [];

  messages.forEach((msg: MessageItem, index) => {
    const messageDate = format(msg.sentAt, 'yyyy.MM.dd', { locale: ko });

    result.push(msg);

    const nextMsg = messages[index + 1];
    const nextDate = nextMsg
      ? format(nextMsg.sentAt, 'yyyy.MM.dd', { locale: ko })
      : '';

    if (messageDate !== nextDate) {
      result.push({ type: 'DATE', date: messageDate });
    }
  });

  return result;
};

export const makeFakeMessage = (
  senderId: number,
  type: MessageType,
  content: string,
) => {
  return {
    id: `fake-${Date.now()}`,
    chatId: 0,
    senderId,
    type,
    content,
    isRead: false,
    sentAt: new Date(),
    date: format(new Date(), 'yyyy.MM.dd', { locale: ko }),
    time: format(new Date(), 'a h:mm', { locale: ko }),
    isMe: true,
  };
};
