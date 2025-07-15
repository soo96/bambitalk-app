import { SOCKET_NAMESPACE } from '@/constants/chat';
import Config from 'react-native-config';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface SocketStore {
  socket: Socket;
  setSocket: (socket: Socket) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: io(Config.SOCKET_URL + SOCKET_NAMESPACE, {
    transports: ['websocket'],
    autoConnect: false,
  }),
  setSocket: (socket) => set({ socket }),
}));

export default useSocketStore;
