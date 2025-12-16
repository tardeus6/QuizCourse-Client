import styles from "@/lib/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface QuestionEditingFormProps {
    questionsState: {
        index: number,
        title: string,
        questions: string[],
        answerVariants: string[][],
        correctAnswers: number[],
        questionsValues: number[]
    },
    setQuestionsState: Dispatch<SetStateAction<{
        _id: string,
        index: number,
        title: string,
        questions: string[],
        answerVariants: string[][],
        correctAnswers: number[],
        questionsValues: number[]
    }>>,
}

export default function QuestionEditingForm({
    questionsState,
    setQuestionsState }: QuestionEditingFormProps) {
    const currentIndex = questionsState.index;

    const variantChangeHandler = useCallback((variantIndex: number, newText: string) => {
        setQuestionsState(prev => {
            const answerVariants = prev.answerVariants.map(arr => arr ? [...arr] : []);
            if (!answerVariants[currentIndex]) answerVariants[currentIndex] = [];
            answerVariants[currentIndex][variantIndex] = newText;
            return { ...prev, answerVariants };
        });
    }, [setQuestionsState, currentIndex]);

    const addVariantHandler = useCallback(() => {
        setQuestionsState(prev => {
            const answerVariants = prev.answerVariants.map(arr => arr ? [...arr] : []);
            if (!answerVariants[currentIndex]) answerVariants[currentIndex] = [];
            answerVariants[currentIndex] = [...answerVariants[currentIndex], ''];
            return { ...prev, answerVariants };
        });
    }, [setQuestionsState, currentIndex]);

    const removeVariantHandler = useCallback((variantIndex: number) => {
        setQuestionsState(prev => {
            const answerVariants = prev.answerVariants.map(arr => arr ? [...arr] : []);
            answerVariants[currentIndex]
                = (answerVariants[currentIndex] || []).filter((_, i) => i !== variantIndex);

            const correctAnswers = [...prev.correctAnswers];
            if (correctAnswers[currentIndex] === variantIndex) {
                correctAnswers[currentIndex] = -1;
            }
            return { ...prev, answerVariants, correctAnswers };
        });
    }, [setQuestionsState, currentIndex]);

    const setCorrectAnswerHandler = useCallback((variantIndex: number) => {
        setQuestionsState(prev => {
            const correctAnswers = [...prev.correctAnswers];
            correctAnswers[currentIndex] = variantIndex;
            return { ...prev, correctAnswers };
        });
    }, [setQuestionsState, currentIndex]);

    const questionChangeHandler = useCallback((text: string) => {
        setQuestionsState(prev => {
            const questions = [...prev.questions];
            questions[currentIndex] = text;
            return { ...prev, questions };
        });
    }, [setQuestionsState, currentIndex]);

    const valueChangeHandler = useCallback((text: string) => {
        setQuestionsState(prev => {
            const questionsValues = [...prev.questionsValues];
            questionsValues[currentIndex] = Number(text);
            return { ...prev, questionsValues };
        });
    }, [setQuestionsState, currentIndex])

    const titleChangeHandler = useCallback((text: string) => {
        setQuestionsState(prev => {
            return { ...prev, title: text };
        });
    }, [setQuestionsState, currentIndex]);

    const currentQuestion = questionsState.questions[currentIndex] ?? '';
    const currentVariants = questionsState.answerVariants[currentIndex] ?? [];
    const correctAnswer = questionsState.correctAnswers[currentIndex];
    const questionValue = questionsState.questionsValues[currentIndex] ?? 0;
    return (
        <View style={styles.commonStyles.formContainer}>
            <TextInput
                style={styles.commonStyles.textInput}
                placeholder="Назва тесту"
                value={questionsState.title}
                placeholderTextColor={styles.mainColorDark}
                textAlign="center"
                onChangeText={titleChangeHandler}
            />
            <Text accessibilityRole="header" style={styles.commonStyles.header}>
                Запитання {currentIndex + 1}
            </Text>

            <TextInput
                style={styles.commonStyles.textInput}
                placeholder="Запитання"
                placeholderTextColor={styles.mainColorDark}
                textAlign="center"
                value={currentQuestion}
                onChangeText={questionChangeHandler}
                accessibilityLabel="Редагувати запитання"
            />

            <TextInput
                style={styles.commonStyles.textInput}
                placeholder="Оцінка за питання"
                placeholderTextColor={styles.mainColorDark}
                textAlign="center"
                value={questionValue.toString() !== '0' ? questionValue.toString() : ''}
                onChangeText={valueChangeHandler}
            />

            <View style={{ flex: 1, width: '100%', rowGap: 10 }}>
                {
                    currentVariants.map((variant, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            columnGap: 10
                        }}>
                            <TextInput
                                style={[styles.commonStyles.textInput, { flex: 1 }]}
                                value={variant}
                                onChangeText={(text) => variantChangeHandler(index, text)}
                                placeholder="Варіант відповіді"
                                placeholderTextColor={styles.mainColorDark}
                                accessibilityLabel={`Варіант ${index + 1}`}
                            />
                            <Pressable onPress={() => removeVariantHandler(index)}
                                accessibilityLabel={`Видалити варіант ${index + 1}`}>
                                <Ionicons name="trash" size={24} color="red" />
                            </Pressable>
                            <Pressable onPress={() => setCorrectAnswerHandler(index)}
                                accessibilityLabel={`Позначити варіант ${index + 1} як правильний`}>
                                <Ionicons name="checkmark-circle" size={24}
                                    color={correctAnswer === index ? "green" : "gray"} />
                            </Pressable>
                        </View>
                    ))
                }
                <Pressable style={styles.commonStyles.button} onPress={addVariantHandler}
                    accessibilityLabel="Додати варіант">
                    <Text style={styles.commonStyles.buttonText}>Додати варіант</Text>
                </Pressable>
            </View>
        </View>
    )
}