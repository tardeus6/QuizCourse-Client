import styles from "@/lib/styles";
import { CompletionData, QuizInfo, TestInfo } from "@/types";
import { SetStateAction, useMemo, useState } from "react";
import { View } from "react-native";
import Test from "./TestCompletion";
import Result from "./TestResult";
import TestStatus from "./TestStatus";

export default function TestPage({ quizInfo, setSelectedQuiz }: { quizInfo: TestInfo, setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>> }) {
    const [quizData, setQuizInfo] = useState<QuizInfo>({
        questions: [],
        answerVariants: [],
        currentQuestion: 0,
        answers: [],
    })
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [completionID, setCompletionID] = useState<string>('');
    const [completionData, setCompletionData] = useState<CompletionData>({});
    console.log(completionData)
    const currentView = useMemo(() => {
        if (!quizData || !started && !finished) {
            return <TestStatus quizData={quizInfo} setQuizData={setQuizInfo} setCompletionID={setCompletionID} setStarted={setStarted} />
        } else if (started && !finished) {
            return <Test quizData={quizData} setQuizData={setQuizInfo} completionID={completionID} setFinished={setFinished} setCompletionData={setCompletionData}/>
        } else if (finished) {
            return <Result resultData={completionData} setSelectedQuiz={setSelectedQuiz}/>
        }
        return <></>
    }, [started, finished, quizData])
    return (
        <View style={styles.commonStyles.container}>
            {
                currentView
            }
        </View>
    )
}