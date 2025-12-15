import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import useAuthStore from "@/store/useAuthStore";
import { QuizInfo, TestInfo } from "@/types";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import CompletionsList from "./ListCompletions";
interface TestDataProps {
    quizData: TestInfo,
    setQuizData: React.Dispatch<React.SetStateAction<QuizInfo>>,
    setCompletionID: React.Dispatch<React.SetStateAction<string>>,
    setStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedQuiz: React.Dispatch<React.SetStateAction<TestInfo | null>>
}
export default function TestStatus({ quizData, setQuizData, setCompletionID, setStarted, setEdit, setSelectedQuiz }: TestDataProps) {
    const [completionsInfo, setCompletionsInfo] = useState([]);
    async function onStart() {
        const response = await apiFetch('/api/completions/start', {
            method: 'POST',
            body: JSON.stringify({ quizID: quizData._id })
        })
        if (response.ok) {
            const data = await response.json();
            setQuizData(prev => {
                if (!prev) return { ...data.completion.quizData, currentQuestion: 0, answers: new Array(data.completion.quizData.questions.length) }
                return { ...prev, questions: data?.quizData.questions, answerVariants: data?.quizData.answerVariants, currentQuestion: 0, answers: new Array(data.completion.quizData.questions.length) };
            });
            setCompletionID(data.completion.completionID);
            setStarted(true);
        }
    }
    console.log(completionsInfo)
    if(useAuthStore().userID === quizData.authorID) {
            useEffect(()=>{
                async function fetchCompletions() {
                    const response = await apiFetch(`/api/completions/quizlist/${quizData._id}`)
                    const result = await response.json();
                    console.log(result)
                    setCompletionsInfo(result)
                }
                fetchCompletions()
            }, [])
        }
    return (
        <View style={{ flexDirection: "column", alignItems: "center", rowGap: 10, margin: 10 }}>
            <Text style={styles.commonStyles.header}>{quizData.title}</Text>
            <Text style={styles.commonStyles.text}>Автор: {quizData.author}</Text>
            <Text style={styles.commonStyles.text}>Кількість питань: {quizData.questionsCount}</Text>
            <Text style={styles.commonStyles.text}>Максимальна оцінка: {quizData.maxGrade}</Text>
            <View style={styles.commonStyles.button}>
                <Pressable onPress={onStart}>
                    <Text style={styles.commonStyles.buttonText}>Почати</Text>
                </Pressable>
            </View>
            {
                useAuthStore().userID === quizData.authorID ? (
                <View style={{width: "100%", rowGap: 10}}>
                    <Pressable
                        style={styles.commonStyles.button} onPress={() => setEdit(true)}>
                        <Text style={styles.commonStyles.buttonText}>Редагувати</Text>
                    </Pressable>
                    <Pressable
                        style={styles.commonStyles.button} onPress={() => {apiFetch('/api/quizzes/delete', {
                            method: 'DELETE',
                            body: JSON.stringify({quizID: quizData._id})
                        });setSelectedQuiz(null)}}>
                        <Text style={styles.commonStyles.buttonText}>Видалити</Text>
                    </Pressable>
                    <CompletionsList completions={completionsInfo}/>
                </View>) : (<></>)
            }
        </View>)
}