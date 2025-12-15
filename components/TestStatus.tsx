import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import { QuizInfo, TestInfo } from "@/types";
import { Pressable, Text, View } from "react-native";
interface TestDataProps{
    quizData: TestInfo, 
    setQuizData: React.Dispatch<React.SetStateAction<QuizInfo>>,
    setCompletionID: React.Dispatch<React.SetStateAction<string>>,
    setStarted: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function TestStatus({quizData, setQuizData, setCompletionID, setStarted}: TestDataProps){
    async function onStart(){
        const response = await apiFetch('/api/completions/start', {
            method:'POST',
            body: JSON.stringify({quizID: quizData._id})
        })
        if(response.ok){
            const data = await response.json();
            setQuizData(prev => {
                if(!prev) return {...data.completion.quizData, currentQuestion: 0, answers: new Array(data.completion.quizData.questions.length)}
                return { ...prev, questions: data?.quizData.questions, answerVariants: data?.quizData.answerVariants, currentQuestion: 0, answers: new Array(data.completion.quizData.questions.length) };
            });
            setCompletionID(data.completion.completionID);
            setStarted(true);
        }
    }
    return (
    <View style={{flexDirection: "column", alignItems: "center", rowGap: 10, margin: 10}}>
        <Text style={styles.commonStyles.header}>{quizData.title}</Text>
        <Text style={styles.commonStyles.text}>Автор: {quizData.author}</Text>
        <Text style={styles.commonStyles.text}>Кількість питань: {quizData.questionsCount}</Text>
        <Text style={styles.commonStyles.text}>Максимальна оцінка: {quizData.maxGrade}</Text>
        <View style={styles.commonStyles.button}>
            <Pressable onPress={onStart}>
                <Text style={styles.commonStyles.buttonText}>Почати</Text>
            </Pressable>
        </View>
    </View>)
}