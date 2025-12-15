import TestManager from "@/components/TestManager";
import styles from "@/lib/styles";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const [mode, setMode] = useState<'homePage' | 'testCreation'>('homePage');
  return (
    <SafeAreaView style={styles.commonStyles.mainContainer}>
      {mode === 'homePage' ? (
        <View style={styles.commonStyles.button}>
          <Pressable onPress={() => setMode('testCreation')}>
            <Text style={styles.commonStyles.buttonText}>
              Створити тест
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.commonStyles.mainContainer}>
          <TestManager mode={"create"} />
        </View>
      )}
    </SafeAreaView>
  );
}
