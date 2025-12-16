import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import { TestInfo } from "@/types";
import { SetStateAction, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import TestList from "./testCompletion/TestList";

export default function TestSearch({ setSelectedQuiz }: { setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>> }) {
    const [QuizInfo, setQuizInfo] = useState<TestInfo[]>([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    useEffect(() => {
        async function fetchTests() {
            const response = await apiFetch('/api/quizzes/list', { method: 'GET' });
            const data = await response.json();
            setQuizInfo(data.data);
        }
        fetchTests();
    }, []);
    console.log('state', QuizInfo)
    function submitFilters(){
        async function applyFilters() {
            const body = {
                titleFilter,
                authorFilter
            }
            const response = await apiFetch('/api/quizzes/filter',{
                method: "POST",
                body: JSON.stringify(body)
            })
            const result = await response.json()
            console.log(result)

            setQuizInfo(result);
        }
        applyFilters()
    }
    return (
        <View>
            <TextInput 
                style={styles.commonStyles.textInput}
                placeholder="title"
                placeholderTextColor={styles.mainColorDark}
                onChangeText={(text) => setTitleFilter(text)}
            />
            <TextInput 
                style={styles.commonStyles.textInput}
                placeholder="author"
                placeholderTextColor={styles.mainColorDark}
                onChangeText={(text) => setAuthorFilter(text)}
            />
            <Pressable style={styles.commonStyles.button} onPress={submitFilters}>
                <Text style={styles.commonStyles.buttonText}>Застосувати фільтри</Text>
            </Pressable>
            <TestList testsInfo={QuizInfo} setSelectedQuiz={setSelectedQuiz} />
        </View>
    );
}