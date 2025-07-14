import { MessageItem, ReceiveMessageDto, RenderItem } from '@/types/chat';
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

  let lastDate = '';

  messages.forEach((msg: MessageItem) => {
    const messageDate = format(msg.sentAt, 'yyyy.MM.dd', {
      locale: ko,
    });

    if (messageDate !== lastDate && result.length > 0) {
      result.push({ type: 'DATE', date: messageDate });
    }

    lastDate = messageDate;

    result.push(msg);
  });

  return result;
};
