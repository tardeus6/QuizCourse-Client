import { apiFetch } from "@/lib/apiFetch";
import styles from "@/lib/styles";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import CompletionsList from "../ListCompletions";
export default function Profile() {
    const [lastCompletions, setLastCompletions] = useState([]);
    const handleLogout = () => {
        useAuthStore.getState().logout();
        Alert.alert('Logged out');
    };
    if(useAuthStore.getState().token){
        useEffect(() => {
            async function fetchLastCompletions() {
                const response = await apiFetch('/api/completions/list')
                const result = await response.json();
                console.log(result)
                setLastCompletions(result)
            }
            fetchLastCompletions()
        }, [])
    }
    return (
        <View style={styles.commonStyles.container}>
            <Text style={{...styles.commonStyles.header, marginBottom: 10}}>Profile Page</Text>
            <Text style={{...styles.commonStyles.header, marginBottom: 10}}>Останні результати</Text>
            <CompletionsList completions={lastCompletions}/>
            <Pressable style={{...styles.commonStyles.button, marginTop: 10}} onPress={handleLogout}>
                <Text style={styles.commonStyles.buttonText}>Logout</Text>
            </Pressable>
        </View>
    )
}