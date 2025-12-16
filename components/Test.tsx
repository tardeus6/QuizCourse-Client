import styles from "@/lib/styles";
import { CompletionData, QuizInfo, TestInfo } from "@/types";
import { SetStateAction, useMemo, useState } from "react";
import { View } from "react-native";
import Test from "./testCompletion/TestCompletion";
import Result from "./testCompletion/TestResult";
import TestManager from "./testManagment/TestManager";
import TestStatus from "./TestStatus";
interface TestPageProps{
    quizInfo: TestInfo, 
    setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>>
}
export default function TestPage({ quizInfo, setSelectedQuiz }:TestPageProps) {
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
    const [edit, setEdit] = useState(false);

    const currentView = useMemo(() => {
        if(edit) return <TestManager quizID={quizInfo._id as string} 
            setSelectedQuiz={setSelectedQuiz}></TestManager>
        if (!quizData || !started && !finished) {
            return <TestStatus quizData={quizInfo} 
                setQuizData={setQuizInfo}  
                setCompletionID={setCompletionID}
                setStarted={setStarted}
                setEdit={setEdit}
                setSelectedQuiz={setSelectedQuiz} />
        } else if (started && !finished) {
            return <Test quizData={quizData} 
                setQuizData={setQuizInfo} 
                completionID={completionID} 
                setFinished={setFinished} 
                setCompletionData={setCompletionData}/>
        } else if (finished) {
            return <Result resultData={completionData} setSelectedQuiz={setSelectedQuiz}/>
        }
    }, [started, finished, quizData, edit])
    return (
        <View style={styles.commonStyles.container}>
            {
                currentView
            }
        </View>
    )
}