import { Message, ReceiveMessageDto } from '@/types/chat';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatMessage = (
  message: ReceiveMessageDto,
  userId: number,
): Message => {
  return {
    ...message,
    id: message.id.toString(),
    time: format(message.time, 'a h:mm', { locale: ko }),
    isMe: userId === message.senderId,
  };
};

export const formatMessageList = (
  messages: ReceiveMessageDto[],
  userId: number,
) => {
  return messages.map((msg) => formatMessage(msg, userId));
};
