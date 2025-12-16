import styles from "@/lib/styles";
import { CompletionData, TestInfo } from "@/types";
import { SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";

export default function TestResult({resultData, setSelectedQuiz}: {resultData: CompletionData, setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>>}) {
    console.log(resultData)
    return (
        <View style={{rowGap: 10}}>
            <Text style={styles.commonStyles.header}>
                {resultData.testTitle}
            </Text>
            <Text style={{...styles.commonStyles.text, fontWeight:"bold"}}>
                Оцінка: {resultData.grade}
                </Text>
            <Text style={{...styles.commonStyles.text, fontWeight:"bold"}}>
                Дата закінчення: {resultData.dateOfCompletion?.toString()}
                </Text>
            <Pressable style={styles.commonStyles.button} onPress={() => setSelectedQuiz(null)}>
                <Text style={styles.commonStyles.buttonText}>
                    Вийти
                </Text>
            </Pressable>
        </View>
    )
}