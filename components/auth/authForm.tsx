import styles from "@/lib/styles";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function AuthForm() {
    const [authType, setAuthType] = useState<'login' | 'register'>('login');
    return (
        <View style={styles.commonStyles.container}>
            {authType === 'login' ? (
                <LoginForm />) : (
                <RegisterForm setAuthType={setAuthType} />
            )}
            <View style={{...styles.commonStyles.container, rowGap: 10, margin: 20, alignItems: 'center'}}>
                <View style={authType === 'login' ? 
                    styles.commonStyles.activeButton
                    : styles.commonStyles.button}>
                    <Pressable onPress={() => setAuthType('login')}>
                        <Text style={styles.commonStyles.buttonText}>Вхід</Text>
                    </Pressable>
                </View>
                <View style={authType === 'register' ? 
                    styles.commonStyles.activeButton
                    : styles.commonStyles.button}>
                    <Pressable onPress={() => setAuthType('register')}>
                        <Text style={styles.commonStyles.buttonText}>Реєстрація</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}