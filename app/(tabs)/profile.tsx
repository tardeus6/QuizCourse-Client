import AuthForm from "@/components/auth/authForm";
import Profile from "@/components/auth/profile";
import styles from "@/lib/styles";
import useAuthStore from "@/store/useAuthStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
    const token = useAuthStore(state => state.token);

    return (
        <SafeAreaView style={{...styles.commonStyles.mainContainer, padding: 20}}>
            {token ? <Profile /> : <AuthForm />}
        </SafeAreaView>
    );
}