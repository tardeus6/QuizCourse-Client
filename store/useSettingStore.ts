import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
interface SettingState {
    serverUrl: string;
}

interface AuthState {
    settings: SettingState
    setSettings: (newSettings: SettingState) => void;
    setServerUrl: (url: string) => void;
}

const useSettingsStore = create<AuthState>()(
    persist(
        (set) => ({
            settings: { serverUrl: 'https://amya-unmachineable-honey.ngrok-free.dev' },
            setSettings: (settings) => set({ settings }),
            setServerUrl: (url: string) =>
                set((state) => ({
                    settings: { ...state.settings, serverUrl: url },
                })),
        }),
        {
            name: 'settings-storage',
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

export default useSettingsStore;
