import { ScrollView, View } from "react-native";
import { QuestionBox } from "./QuestionBox";

interface QuestionListProps {
    questions: string[];
    currentQuestion: number;
    setCurrentQuestion: (index: number) => void;
    AdditionalItem?: React.JSX.Element; 
}

export default function QuestionList({ 
        questions, 
        currentQuestion, 
        setCurrentQuestion, 
        AdditionalItem }: QuestionListProps) {
    return (
        <View>
            <ScrollView horizontal contentContainerStyle={{ alignItems: 'center', columnGap: 4 }}>
                {questions.map((question, index) => (
                    <QuestionBox
                        key={index}
                        index={index}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                ))}
                {AdditionalItem}
            </ScrollView>
        </View>
    );
}