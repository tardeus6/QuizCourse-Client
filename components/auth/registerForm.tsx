import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


interface RegisterFormProps {
    setAuthType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setAuthType }) => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    function changeNickname(text: string) {
        setNickname(text);
    }

    function changePassword(text: string) {
        setPassword(text);
    }

    async function handleRegister() {
        if (nickname && password) {
            const response = await apiFetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username: nickname, password }),
            });
            const data = await response.json();
            setAuthType('login');
        }
    }
    return (
        <View style={{ ...styles.commonStyles.formContainer, justifyContent: 'space-between' }}>
            <View style={{ rowGap: 15, width: '100%', alignItems: 'center' }}>
                <Text style={styles.commonStyles.header}>Реєстація</Text>
                <TextInput
                    style={styles.commonStyles.textInput}
                    placeholderTextColor={styles.mainColorDark}
                    placeholder="Ім'я користувача"
                    onChangeText={changeNickname}
                    accessibilityLabel="Ввести ім'я користувача"
                />
                <TextInput
                    style={styles.commonStyles.textInput}
                    placeholderTextColor={styles.mainColorDark}
                    placeholder="Пароль"
                    secureTextEntry
                    onChangeText={changePassword}
                    accessibilityLabel="Ввести пароль"
                />
            </View>
            <Pressable style={styles.commonStyles.button} onPress={handleRegister} accessibilityLabel="Увійти">
                <Text style={styles.commonStyles.buttonText}>Зареєструватися</Text>
            </Pressable>
        </View>);
}

export default RegisterForm;