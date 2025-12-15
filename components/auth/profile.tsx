import styles from "@/lib/styles";
import useAuthStore from "@/store/useAuthStore";
import { Alert, Pressable, Text, View } from "react-native";

export default function Profile() {
    const handleLogout = () => {
        useAuthStore.getState().logout();
        Alert.alert('Logged out');
    };

    return (
        <View style={styles.commonStyles.container}>
            <Text style={styles.commonStyles.header}>Profile Page</Text>
            <Pressable style={styles.commonStyles.button} onPress={handleLogout}>
                <Text style={styles.commonStyles.buttonText}>Logout</Text>
            </Pressable>
        </View>
    )
}