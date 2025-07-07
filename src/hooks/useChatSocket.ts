import { SOCKET_NAMESPACE } from '@/constants/chat';
import { useSocketStore } from '@/stores/useSocketStore';
import { showErrorToast } from '@/utils/toastUtil';
import { useEffect, useRef } from 'react';
import Config from 'react-native-config';
import { io, Socket } from 'socket.io-client';

export const useChatSocket = ({
  coupleId,
  userId,
  onMessageReceived,
}: {
  coupleId: number;
  userId: number;
  onMessageReceived: (message: any) => void;
}) => {
  const setSocket = useSocketStore((state) => state.setSocket);

  useEffect(() => {
    const socket: Socket = io(Config.SOCKET_URL + SOCKET_NAMESPACE, {
      transports: ['websocket'],
      query: {
        coupleId,
        userId,
      },
    });

    setSocket(socket);

    socket.on('connect', () => {
      console.log('✅ Socket connected!', socket.id);
    });

    socket.on('receive_message', (message) => {
      onMessageReceived(message);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      showErrorToast('채팅 연결이 끊겼습니다. 다시 시도 중이에요.');
    });

    socket.on('connect_error', (err) => {
      console.log('🚨 Socket error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, [coupleId, userId, onMessageReceived]);
};
