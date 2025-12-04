import QuestionView from "@/components/QuestionView";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const questions: string[] = ['2+2', 'whats triangle', 'I=R/?']
const answerVariants: string[][] = [['4', '6', '9'], ['figure with 5 angles', 'figure with 4 sides', 'figure whose'], ['F', 'U', 'dont know']]
export default function TestPage(){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>(Array(answerVariants.length).fill(-1));

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ScrollView horizontal contentContainerStyle={{alignItems: 'center', columnGap: 4}}>
                    {
                    questions.map((question, index) => (
                        <View key={index} style={index === currentQuestion? styles.activeQuestionBox : styles.questionBox}>
                            <Pressable style={({pressed}) => [
                                index === currentQuestion? styles.activeQuestionBox : styles.questionBox,
                                pressed && styles.questionBoxPressed
                            ]} onPress={() => {setCurrentQuestion(index)}}>
                                <Text style={index === currentQuestion ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}>{index + 1}</Text>
                            </Pressable>
                        </View>))
                    }
                </ScrollView>
            </View>
            <QuestionView question={questions[currentQuestion]}
                number={currentQuestion+1}
                variants={answerVariants[currentQuestion]}
                answers={answers}
                setAnswers={setAnswers}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#25292e',
        alignContent: 'center'
    },
    questionBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 32,
        backgroundColor: '#AFEEEE'
    },
    questionBoxPressed: {
        backgroundColor: "#80acacff"
    },
    activeQuestionBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 52,
        height: 36,
        backgroundColor: '#AFEEEE'
    },
    container: {
        padding: 8,
        flex:1,
        backgroundColor: '#25292e',
    },
    text: {
        color: "#fff"
    },
    questionNumber:{
        fontSize: 20,
        fontWeight: 'bold'
    }
})