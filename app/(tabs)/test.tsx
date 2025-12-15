import Test from "@/components/Test";
import TestSearch from "@/components/TestSearch";
import styles from "@/lib/styles";
import { TestInfo } from "@/types";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function TestPage(){
    const [selectedQuiz, setSelectedQuiz] = useState<TestInfo | null>(null);
    
    function selectView() {
        switch (selectedQuiz) {
            case null:
                return <TestSearch setSelectedQuiz={setSelectedQuiz}/>;
            default:
                return <Test quizInfo={selectedQuiz} setSelectedQuiz={setSelectedQuiz}/>
        }
    }
    return (
        <SafeAreaView style={styles.commonStyles.mainContainer}>
            {
                selectView()
            }
        </SafeAreaView>
    )
}