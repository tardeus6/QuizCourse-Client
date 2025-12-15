import styles from "@/lib/styles";
import { CompletionData, TestInfo } from "@/types";
import { SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";

export default function TestResult({resultData, setSelectedQuiz}: {resultData: CompletionData, setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>>}) {
    return (
        <View>
            <Text style={styles.commonStyles.header}>{resultData.testTitle}</Text>
            <Text style={styles.commonStyles.text}>Оцінка: {resultData.grade}</Text>
            <Text style={styles.commonStyles.text}>Дата закінчення: {resultData.dateOfCompletion?.toString()}</Text>
            <Pressable style={styles.commonStyles.button} onPress={() => setSelectedQuiz(null)}>
                <Text style={styles.commonStyles.buttonText}>
                    Вийти
                </Text>
            </Pressable>
        </View>
    )
}