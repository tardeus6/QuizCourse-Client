import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import QuestionEditingForm from "./QuestionEditingForm";
import QuestionList from "./QuestionList";

export default function TestManager({ mode }: { mode: 'create' | 'edit' }) {
    const [questionsState, setQuestionsState] = useState({
        index: 0,
        questions: [] as string[],
        answerVariants: [] as string[][],
        correctAnswers: [] as number[],
        questionsValues: [] as number[],
    });

    const sendQuizToServer = async () => {
        const quizData = {
            title: `Quiz ${new Date().toLocaleDateString()}`, // Example title
            questions: questionsState.questions,
            answers: questionsState.answerVariants,
            correctAnswers: questionsState.correctAnswers,
            answerValues: questionsState.questionsValues,
        };

        try {
            const response = await apiFetch('/api/quizzes/create', {
                method: 'POST',
                body: JSON.stringify(quizData),
            });

            const result = await response.json();

        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Error', `Failed to create quiz: ${error.message}`);
                console.error('Error sending quiz to server:', error);
            } else {
                Alert.alert('Error', `Failed to create quiz: ${String(error)}`);
                console.error('Error sending quiz to server:', error);
            }
        }
    };

    const AdditionalItem = (
        <View style={styles.commonStyles.questionBox}>
            <Pressable
                onPress={() =>
                    setQuestionsState((prev) => ({
                        ...prev,
                        questions: [...prev.questions, `New Question ${prev.questions.length + 1}`],
                        answerVariants: [...prev.answerVariants, []],
                        correctAnswers: [...prev.correctAnswers, -1], // Initialize with no correct answer
                    }))
                }
            >
                <Text style={styles.commonStyles.questionBoxText}>+</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.commonStyles.mainContainer}>
            <QuestionList
                questions={questionsState.questions}
                currentQuestion={questionsState.index}
                setCurrentQuestion={(newIndex) =>
                    setQuestionsState((prev) => ({
                        ...prev,
                        index: typeof newIndex === 'function' ? newIndex(prev.index) : newIndex,
                    }))
                }
                AdditionalItem={AdditionalItem}
            />
            <QuestionEditingForm questionsState={questionsState} setQuestionsState={setQuestionsState} />
            <Pressable style={styles.commonStyles.button} onPress={sendQuizToServer}>
                <Text style={styles.commonStyles.buttonText}>Відправити тест</Text>
            </Pressable>
        </View>
    );
}