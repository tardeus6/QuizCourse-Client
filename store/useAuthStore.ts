import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: async (name: string): Promise<StorageValue<AuthState> | null> => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: StorageValue<AuthState>) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: AsyncStorage.removeItem,
      },
    }
  )
);

export default useAuthStore;
