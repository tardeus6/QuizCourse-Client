import styles from "@/lib/styles"
import { ScrollView, Text, View } from "react-native"
interface Completion{
    quizID: {
        title: string
    },
    grade: number,
    dateOfCompletion: Date
    completedBy?: {
        username: string
    }
}

export default function CompletionsList({completions} :{completions: Completion[]} ){
    return (
        <ScrollView>
            {completions.map((item, key) => {
                return (<View key={key}>
                    <Text style={{...styles.commonStyles.text, fontWeight: "bold"}}>{item.quizID.title}</Text>
                    <Text style={{...styles.commonStyles.text, fontWeight: "bold"}}>Оцінка: {item.grade}</Text>
                    <Text style={{...styles.commonStyles.text, fontWeight: "bold"}}>Виконано: {item.completedBy ? 
                    item.dateOfCompletion.toString() + ' ' + item.completedBy.username 
                    : item.dateOfCompletion.toString()}</Text>
                </View>)
            })}
        </ScrollView>
    )
}