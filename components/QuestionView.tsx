import { Pressable, StyleSheet, Text, View } from "react-native";

interface QuestionViewProps{
  question: string,
  variants: string[],
  number: number,
  answers: number[],
  setAnswers: React.Dispatch<React.SetStateAction<number[]>>
}
export default function QuestionView({question, variants, number, answers, setAnswers} : QuestionViewProps) {
  return (
    <View style= {styles.container}>
        <View>
          <Text style={styles.questionHeader}>Запитання {number}</Text>
        </View>
        <View>
          <Text style={styles.text}>{question}</Text>
        </View>
        <View style={styles.variantsContainer}>
          {
            variants.map((variant, index) => (
              <View key={index}>
                <Pressable style={styles.variantContainer} onPress={() => {
                    let newAnswers = [...answers];
                    newAnswers[number-1] = index;
                    setAnswers(newAnswers);
                  }}>
                  <View style={answers[number-1] === index ? styles.activeVariantPoint: styles.variantPoint}>
                  </View>
                  <Text style={styles.text}>{variant}</Text>
                </Pressable>
              </View>
            ))
          }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    rowGap: 16
  },
  variantsContainer : {
    alignSelf: 'flex-start',
    margin: 8,
    rowGap: 8
  },
  variantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8
  },
  text:{
    color: '#fff'    
  },
  questionHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  },
  activeVariantPoint: {
    backgroundColor: '#AFEEEE',
    borderColor: '#AFEEEE',
    borderWidth: 1,
    borderRadius: 8,
    height: 16,
    width: 16
  },
  variantPoint: {
    backgroundColor: '#25292e',
    borderColor: '#AFEEEE',
    borderWidth: 1,
    borderRadius: 8,
    height: 16,
    width: 16
  }
})