import styles from "@/lib/styles";
import useSettingsStore from "@/store/useSettingStore";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [serverUrl, setServerUrl] = useState(useSettingsStore.getState().serverUrl);
  function changeServerUrl(text: string) {
    setServerUrl(text);
  }
  function saveSettings() {
    useSettingsStore.getState().setServerUrl(serverUrl);
  }
  return (
    <SafeAreaView style= {{...styles.commonStyles.mainContainer, padding: 20}}>
      <View style={styles.commonStyles.formContainer}>
        <Text style={styles.commonStyles.header}>Налаштування</Text>
        <TextInput 
          style={styles.commonStyles.textInput}
          onChangeText={changeServerUrl}
          placeholder="Server URL"
          placeholderTextColor={styles.mainColorDark}
        />
        <View>
          <Pressable style={styles.commonStyles.button} onPress={saveSettings}
            accessibilityLabel="Зберегти налаштування">
            <Text style={styles.commonStyles.buttonText}>Зберегти</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}