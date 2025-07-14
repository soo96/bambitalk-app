export interface Message {
  id: string;
  text: string;
  senderId: number;
  isMe: boolean;
  time: Date;
  isRead: boolean;
}

export interface ReceiveMessageDto {
  id: number;
  senderId: number;
  text: string;
  time: Date;
  isRead: boolean;
}

export type RenderItem =
  | { type: 'date'; date: string }
  | {
      type: 'message';
      id: string;
      text: string;
      senderId: number;
      isMe: boolean;
      time: string;
      isRead: boolean;
    };
