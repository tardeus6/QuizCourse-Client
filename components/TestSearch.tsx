import { apiFetch } from "@/lib/apiFetch";
import { TestInfo } from "@/types";
import { SetStateAction, useEffect, useState } from "react";
import TestList from "./TestList";

export default function TestSearch({setSelectedQuiz}: {setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>>}) {
    const [QuizInfo, setQuizInfo] = useState([]);
    useEffect(() => {
        async function fetchTests() {
            const response = await apiFetch('/api/quizzes/list', { method: 'GET' });
            const data = await response.json();
            setQuizInfo(data.data);
        }
        fetchTests();
    }, []);
    return (
        <TestList testsInfo={QuizInfo} setSelectedQuiz={setSelectedQuiz}/>
    );
}