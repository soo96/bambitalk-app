export interface MessageItem {
  id: string;
  chatId: number;
  senderId: number;
  type: MessageType;
  content: string;
  isRead: boolean;
  sentAt: Date;
  date: string;
  time: string;
  isMe: boolean;
}

export interface ReceiveMessageDto {
  id: number;
  chatId: number;
  senderId: number;
  type: MessageType;
  content: string;
  isRead: boolean;
  sentAt: Date;
}

export interface SendMessagePayload {
  type: MessageType;
  content: string;
}

export type RenderItem = { type: 'DATE'; date: string } | MessageItem;

export type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DATE';
