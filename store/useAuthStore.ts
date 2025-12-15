import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';

interface AuthState {
  userID: string | null,
  token: string | null;
  login: (token: string, userID: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userID: null,
      token: null,
      login: (token, userID) => set({ token, userID }),
      logout: () => set({ token: null, userID: null }),
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
