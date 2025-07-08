import { Message, ReceiveMessageDto, RenderItem } from '@/types/chat';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatMessage = (
  message: ReceiveMessageDto,
  userId: number,
): Message => {
  return {
    ...message,
    id: message.id.toString(),
    isMe: userId === message.senderId,
  };
};

export const formatMessageList = (
  messages: ReceiveMessageDto[],
  userId: number,
) => {
  return messages.map((msg) => formatMessage(msg, userId));
};

export const groupMessagesWithDateSeparators = (messages: Message[]) => {
  const result: RenderItem[] = [];

  let lastDate = '';

  messages.forEach((msg: Message) => {
    const messageDate = format(new Date(msg.time), 'yyyy.MM.dd', {
      locale: ko,
    });

    if (messageDate !== lastDate && result.length > 0) {
      result.push({ type: 'date', date: messageDate });
    }

    lastDate = messageDate;

    result.push({
      type: 'message',
      ...msg,
      time: format(msg.time, 'a h:mm', { locale: ko }),
    });
  });

  return result;
};
