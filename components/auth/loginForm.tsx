import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginForm() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    function changeNickname(text: string) {
        setNickname(text);
    }

    function changePassword(text: string) {
        setPassword(text);
    }

    async function handleLogin() {
        if (nickname && password) {
            const response = await apiFetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username: nickname, password }),
            });
            const data = await response.json();
            useAuthStore.getState().login(data.token);
        }
    }
    return (
        <View style={{...styles.commonStyles.formContainer, justifyContent: 'space-between'}}>
            <View style={{ rowGap: 15, width: '100%' , alignItems: 'center' }}>
                <Text style={styles.commonStyles.header}>Вхід</Text>
                <TextInput
                    style={styles.commonStyles.textInput}
                    placeholder="Ім'я користувача"
                    placeholderTextColor={styles.mainColorDark}
                    onChangeText={changeNickname}
                    accessibilityLabel="Ввести ім'я користувача"
                />
                <TextInput
                    style={styles.commonStyles.textInput}
                    placeholder="Пароль"
                    placeholderTextColor={styles.mainColorDark}
                    secureTextEntry
                    onChangeText={changePassword}
                    accessibilityLabel="Ввести пароль"
                />
            </View>
            <Pressable style={styles.commonStyles.button} onPress={handleLogin} accessibilityLabel="Увійти">
                <Text style={styles.commonStyles.buttonText}>Увійти</Text>
            </Pressable>
        </View>);
}