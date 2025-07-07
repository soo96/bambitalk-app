export interface Message {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

export interface ReceiveMessageDto {
  id: number;
  senderId: number;
  text: string;
  time: Date;
}
