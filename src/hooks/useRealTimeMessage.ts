import { MessageItem } from '@/types/chat';
import { useCallback, useState } from 'react';

export const useRealTimeMessage = () => {
  const [realtimeMessages, setRealtimeMessages] = useState<MessageItem[]>([]);

  const addRealtimeMessage = useCallback((message: MessageItem) => {
    setRealtimeMessages((prev) => [message, ...prev]);
  }, []);

  const clearRealtimeMessages = useCallback(() => {
    setRealtimeMessages([]);
  }, []);

  const markMessagesAsRead = useCallback(() => {
    setRealtimeMessages((prev) =>
      prev.map((msg) => (msg.isMe ? { ...msg, isRead: true } : msg)),
    );
  }, []);

  return {
    realtimeMessages,
    addRealtimeMessage,
    clearRealtimeMessages,
    markMessagesAsRead,
  };
};
