import styles from "@/lib/styles";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface QuestionBoxProps {
    index: number;
    currentQuestion: number;
    setCurrentQuestion: (index: number) => void;
}

export function QuestionBox({ index, currentQuestion, setCurrentQuestion }: QuestionBoxProps) {
    return (
        <View key={index}>
            <Pressable
                style={({ pressed }) => [
                    index === currentQuestion
                        ? styles.commonStyles.activeQuestionBox
                        : styles.commonStyles.questionBox,
                    pressed && styles.commonStyles.activeQuestionBox,
                ]}
                onPress={() => {
                    setCurrentQuestion(index);
                }}
            >
                <Text style={styles.commonStyles.questionBoxText}>{index + 1}</Text>
            </Pressable>
        </View>
    );
}