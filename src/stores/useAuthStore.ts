import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: {
    userId: number;
    coupleId: number;
    spouseId: number;
    nickname: string;
  } | null;
  hydrated: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  setAuth: (payload: {
    user: AuthState['user'];
    accessToken: string;
    refreshToken: string;
  }) => void;

  clearAuth: () => void;
  setHydrated: ({ hydrated }: { hydrated: boolean }) => void;
}

export interface AuthPayload {
  user: AuthState['user'];
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      accessToken: null,
      refreshToken: null,
      setAuth: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),
      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null }),
      setHydrated: ({ hydrated }) => set({ hydrated }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated({ hydrated: true });
      },
    },
  ),
);
