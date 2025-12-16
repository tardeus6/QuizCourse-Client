import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import { TestInfo } from "@/types";
import { SetStateAction, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import QuestionList from "../QuestionList";
import QuestionEditingForm from "./QuestionEditingForm";
interface TestManagerProps{
     quizID?: string, 
     setSelectedQuiz?: React.Dispatch<SetStateAction<TestInfo | null>>, 
     changeMode?: (mode: 'homePage' | 'testCreation') => void 
    }
export default function TestManager({ quizID, setSelectedQuiz, changeMode }: TestManagerProps) {
    const [questionsState, setQuestionsState] = useState({
        _id: '',
        index: 0,
        title: '',
        questions: [] as string[],
        answerVariants: [] as string[][],
        correctAnswers: [] as number[],
        questionsValues: [] as number[],
    });
    if(quizID !== '' && quizID){
        useEffect(()=>{
            async function fetch() {
                const response = await apiFetch(`/api/quizzes/${quizID}`)
                const result = await response.json();

                setQuestionsState((prev) => {
                    return {...prev, quizID, title: result.data.title,
                            questions: result.data.questions,
                            answerVariants: result.data.answerVariants,
                            correctAnswers: result.data.correctAnswers,
                            questionsValues: result.data.answersValue}
                })
            }
            fetch()
        }, [])
    }
    const sendQuizToServer = async () => {
        const quizData = {
            quizID,
            title: questionsState.title,
            questions: questionsState.questions,
            answersVariants: questionsState.answerVariants,
            correctAnswers: questionsState.correctAnswers,
            answersValue: questionsState.questionsValues,
        };

        try {
            let response;
            if (quizData !== undefined && setSelectedQuiz) {
                response = await apiFetch('/api/quizzes/edit', {
                    method: "PUT",
                    body: JSON.stringify(quizData)
                })
                setSelectedQuiz(null);
            } else {
                response = await apiFetch('/api/quizzes/create', {
                    method: 'POST',
                    body: JSON.stringify(quizData),
                });
                if(changeMode) changeMode('homePage')
            }

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
                        correctAnswers: [...prev.correctAnswers, -1], 
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
                        index: newIndex,
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