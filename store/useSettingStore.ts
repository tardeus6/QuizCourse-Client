import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
interface SettingState {
    serverUrl: string;
    setServerUrl: (url: string) => void
}


const useSettingsStore = create<SettingState>()(
    persist(
        (set) => ({
            serverUrl: 'https://amya-unmachineable-honey.ngrok-free.dev',
            setServerUrl: (url: string) =>
                set((state) => ({
                    serverUrl: url,
                })),
        }),
        {
            name: 'settings-storage',
            storage: {
                getItem: async (name: string): Promise<StorageValue<SettingState> | null> => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name: string, value: StorageValue<SettingState>) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: AsyncStorage.removeItem,
            },
        }
    )
);

export default useSettingsStore;
