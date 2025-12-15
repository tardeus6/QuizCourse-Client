export interface TestInfo {
    _id?: string;
    title?: string;
    author?: string;
    authorID?: string;
    questionsCount?: number;
    maxGrade?: number;
}

export interface QuizInfo extends TestInfo{
    questions: string[],
    answerVariants: string[][],
    currentQuestion: number,
    answers: number[]
}

export interface CompletionData{
    grade?: number,
    testTitle?: string,
    dateOfCompletion?: Date
}