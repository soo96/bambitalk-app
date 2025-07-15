import { useAuthStore } from '@/stores/useAuthStore';
import useSocketStore from '@/stores/useSocketStore';
import { SendMessagePayload } from '@/types/chat';
import { useCallback, useEffect } from 'react';
import { Socket } from 'socket.io-client';

export const useChatSocket = ({
  handleMessageReceived,
  handleUpdateReadStatus,
}: {
  handleMessageReceived: (message: any) => void;
  handleUpdateReadStatus: () => void;
}) => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { socket, setSocket } = useSocketStore();

  useEffect(() => {
    const socketInstance: Socket = socket;

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected!', socketInstance.id);
    });

    socketInstance.on('receive_message', (message) => {
      handleMessageReceived(message);
      readAllMessages();
    });

    socketInstance.on('update_read_status', (senderId: number) => {
      if (user?.userId === senderId) return;

      handleUpdateReadStatus();
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    socketInstance.on('connect_error', (err) => {
      console.log('🚨 Socket error:', err);
    });

    socketInstance.on('error', (message) => {
      console.log(message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [handleMessageReceived, handleUpdateReadStatus]);

  const connect = useCallback(() => {
    if (!socket) return;
    if (socket.connected) return;

    socket.auth = { token: accessToken };
    socket.io.opts.query = { coupleId: user?.coupleId };

    socket.connect();
  }, []);

  const disconnect = useCallback(() => {
    if (!socket) return;
    socket.disconnect();
  }, []);

  const sendMessage = (payload: SendMessagePayload) => {
    if (!socket) return;

    if (socket.connected) {
      console.log('✅ Connected. Sending message now.');
      socket.emit('send_message', payload);
    }
  };

  const readAllMessages = () => {
    if (!socket) return;

    socket.emit('read_all_messages');
  };

  return {
    sendMessage,
    readAllMessages,
    disconnect,
    connect,
    isConnected: socket?.connected,
  };
};
