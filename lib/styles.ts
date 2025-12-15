import { StyleSheet } from "react-native";
const mainColor = "#339cff";
const mainColorDark = "#007bff";
const backgroundColor = "#25292e";
const styles = {
    mainColor,
    backgroundColor,
    mainColorDark,
    commonStyles: StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
        formContainer: {
            flex: 1,
            rowGap: 15,
            padding: 20,
            margin: 10,
            borderRadius: 10,
            borderColor: mainColor,
            borderWidth: 1,
            alignItems: 'center',
        },
        container: {
            flex: 1,
        },
        questionBox: {
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: mainColor,
        },
        activeQuestionBox: {
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 5,
            backgroundColor: mainColorDark,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: mainColor
        },
        text : {
            color: mainColor
        },
        questionBoxText: {
            alignSelf: 'center',
            fontSize: 18,
            color: backgroundColor,
            fontWeight: 'bold',
        },
        textInput: {
            width: '100%',
            borderColor: mainColor,
            borderWidth: 1,
            borderRadius: 5,
            color: mainColor,
        },
        button: {
            width: '100%',
            padding: 10,
            backgroundColor: mainColor,
            borderRadius: 5,
        },
        activeButton: {
            width: '100%',
            padding: 10,
            backgroundColor: mainColorDark,
            borderRadius: 5,
        },
        buttonText: {
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: backgroundColor
        }
    })
}
styles.mainColor = mainColor;
styles.backgroundColor = backgroundColor;
export default styles;