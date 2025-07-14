import { SOCKET_NAMESPACE } from '@/constants/chat';
import { useAuthStore } from '@/stores/useAuthStore';
import { SendMessagePayload } from '@/types/chat';
import { useCallback, useEffect, useRef } from 'react';
import Config from 'react-native-config';
import { io, Socket } from 'socket.io-client';

export const useChatSocket = ({
  handleMessageReceived,
  handleUpdateReadStatus,
}: {
  handleMessageReceived: (message: any) => void;
  handleUpdateReadStatus: () => void;
}) => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) return;

    const socketInstance: Socket = io(Config.SOCKET_URL + SOCKET_NAMESPACE, {
      transports: ['websocket'],
      autoConnect: false,
      query: {
        coupleId: user?.coupleId,
      },
      auth: {
        token: accessToken,
      },
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected!', socketInstance.id);
    });

    socketInstance.on('receive_message', (message) => {
      handleMessageReceived(message);

      if (!socketRef.current) return;

      socketRef.current.emit('read_all_messages');
    });

    socketInstance.on('update_read_status', (senderId: number) => {
      if (user?.userId === senderId) return;

      handleUpdateReadStatus();
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    socketInstance.on('connect_error', (err) => {
      console.log('🚨 Socket error:', err);
    });

    socketInstance.on('error', (message) => {
      console.log(message);
    });

    socketRef.current = socketInstance;

    return () => {
      socketInstance.disconnect();
    };
  }, [handleMessageReceived, handleUpdateReadStatus]);

  const connect = useCallback(() => {
    if (!socketRef.current) return;
    if (socketRef.current.connected) return;
    socketRef.current.connect();
  }, []);

  const disconnect = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.disconnect();
  }, []);

  const sendMessage = (payload: SendMessagePayload) => {
    if (!socketRef.current || !socketRef.current.connected) return;

    socketRef.current.emit('send_message', payload);
  };

  const readAllMessages = () => {
    if (!socketRef.current) return;

    socketRef.current.emit('read_all_messages');
  };

  return {
    sendMessage,
    readAllMessages,
    disconnect,
    connect,
    isConnected: socketRef.current?.connected,
  };
};
