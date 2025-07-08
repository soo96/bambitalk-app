import { Message } from '@/types/chat';
import { create } from 'zustand';

interface ChatState {
  realtimeMessages: Message[];
  addRealtimeMessage: (message: Message) => void;
  clearRealtimeMessages: () => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  realtimeMessages: [],
  addRealtimeMessage: (message) =>
    set((state) => ({
      realtimeMessages: [message, ...state.realtimeMessages],
    })),
  clearRealtimeMessages: () => set({ realtimeMessages: [] }),
}));
