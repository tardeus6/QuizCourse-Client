import styles from '@/lib/styles';
import { TestInfo } from '@/types';
import { SetStateAction } from "react";
import { FlatList, Pressable, Text, View } from 'react-native';

export default function TestList({ testsInfo, setSelectedQuiz }: { testsInfo: TestInfo[], setSelectedQuiz: React.Dispatch<SetStateAction<TestInfo | null>> }) {
    return (
        <View>
            <FlatList
                data={testsInfo}
                renderItem={({ item }) => ( 
                    <View key={item._id} style={{...styles.commonStyles.container, borderColor: styles.mainColor, borderWidth: 2, marginBottom: 10, padding: 10}}>
                        <Pressable onPress={() => {setSelectedQuiz(item)}}>
                            <Text style={styles.commonStyles.header}>{item.title}</Text>
                            <Text style={styles.commonStyles.text}>Автор: {item.author}</Text>
                            <Text style={styles.commonStyles.text}>Questions: {item.questionsCount}</Text>
                            <Text style={styles.commonStyles.text}>Max Grade: {item.maxGrade}</Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}