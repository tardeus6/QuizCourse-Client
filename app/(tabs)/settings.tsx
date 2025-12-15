import styles from "@/lib/styles";
import useSettingsStore from "@/store/useSettingStore";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [settings, setSettings] = useState(useSettingsStore.getState().settings);
  function changeServerUrl(text: string) {
    setSettings({...settings, serverUrl: text});
  }
  function saveSettings() {
    useSettingsStore.getState().setSettings(settings);
  }
  return (
    <SafeAreaView style= {styles.commonStyles.mainContainer}>
      <View style={styles.commonStyles.formContainer}>
        <Text style={styles.commonStyles.header}>Налаштування</Text>
        <TextInput 
          style={styles.commonStyles.textInput}
          onChangeText={changeServerUrl}
          placeholder="Server URL"
          placeholderTextColor={styles.mainColorDark}
        />
        <View>
          <Pressable style={styles.commonStyles.button} onPress={saveSettings} accessibilityLabel="Зберегти налаштування">
            <Text style={styles.commonStyles.buttonText}>Зберегти</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}