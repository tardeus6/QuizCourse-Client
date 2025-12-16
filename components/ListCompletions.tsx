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
        <ScrollView style={{borderRadius: 16, borderWidth:2, 
            borderColor: styles.mainColor, padding:16}}>
            {completions.map((item, key) => {
                return (<View key={key} style={{padding:8}}>
                    <Text style={{...styles.commonStyles.text, fontWeight: "bold"}}>
                        {item?.quizID?.title ?? 'deleted'}
                        </Text>
                    <Text style={{...styles.commonStyles.text, fontWeight: "bold"}}>
                        Оцінка: {item.grade}
                        </Text>
                    <Text style={{...styles.commonStyles.text, fontWeight: "bold"}}>
                        Виконано: {item.completedBy ? item.dateOfCompletion.toString()
                    : item.dateOfCompletion.toString() + ' ' + item.completedBy.username }
                    </Text>
                </View>)
            })}
        </ScrollView>
    )
}