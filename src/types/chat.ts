export interface Message {
  id: string;
  text: string;
  isMe: boolean;
  time: Date;
}

export interface ReceiveMessageDto {
  id: number;
  senderId: number;
  text: string;
  time: Date;
}

export type RenderItem =
  | { type: 'date'; date: string }
  | { type: 'message'; id: string; text: string; isMe: boolean; time: string };
