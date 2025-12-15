import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import { CompletionData, QuizInfo } from "@/types";
import { Pressable, Text, View } from "react-native";
import QuestionList from "../QuestionList";

interface TestCompletionProps{
    quizData: QuizInfo,
    setQuizData: React.Dispatch<React.SetStateAction<QuizInfo>>,
    completionID: string,
    setFinished: React.Dispatch<React.SetStateAction<boolean>>,
    setCompletionData: React.Dispatch<React.SetStateAction<CompletionData>>,
}
export default function TestCompletion({ quizData, setQuizData, completionID, setFinished, setCompletionData }:TestCompletionProps ) {
    const currentQuestion = quizData.currentQuestion;
    console.log(quizData)
    function submitResults(){
        async function submitRes() {
            const result = await apiFetch('/api/completions/finish', {
                method: 'POST',
                body: JSON.stringify({
                    testTitle: quizData.title,
                    completionID: completionID,
                    answers: quizData.answers
                })
            })
            const data = await result.json();
            setCompletionData({grade: data.data.grade, dateOfCompletion: data.data.dateOfCompletion, testTitle: quizData.title})
            setFinished(true);
        }
        submitRes();
    }
    return (
        <View style={{margin: 10, padding: 20, borderRadius: 10, borderColor: styles.mainColor, borderWidth: 1,}}>
            <QuestionList
                currentQuestion={quizData.currentQuestion as number}
                questions={quizData.questions as string[]}
                setCurrentQuestion={(number) => {
                    setQuizData(prev => {
                        return { ...prev, currentQuestion: number }
                    })
                }} />

            <Text style={styles.commonStyles.header}>
                Запитання {quizData.currentQuestion + 1}
            </Text>
            <Text style={styles.commonStyles.header}>
                {quizData.questions[quizData.currentQuestion]}
            </Text>
            <View>
                {quizData !== undefined ? quizData.answerVariants?.[currentQuestion]?.map((variant, index) => (
                        <Pressable key={index} style={{flexDirection: "row", alignItems: "center", columnGap: 10}}
                            onPress={()=>{
                                setQuizData((prev)=>{
                                    let newAnswers = [...prev.answers];
                                    newAnswers[currentQuestion] = index;
                                    return {...prev, answers: newAnswers}
                                })
                            }}>
                            <View
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderWidth:
                                        index === quizData.answers?.[currentQuestion] ? 4 : 0,
                                    borderRadius: 9,
                                    borderColor: styles.mainColor,
                                }}
                            />
                            <Text style={{fontSize: 20, color: styles.mainColor}}>{variant}</Text>
                        </Pressable>
                )): <></>}
            </View>
            <Pressable style={{...styles.commonStyles.button, marginTop: 20}}
                onPress={submitResults}>
                <Text style={styles.commonStyles.buttonText}>Завершити тест</Text>
            </Pressable>
        </View>
    )
}