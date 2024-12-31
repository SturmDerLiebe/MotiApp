import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthenticationLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTintColor: Colors.blue.dark,
                headerTitle: "",
                headerStyle: { backgroundColor: Colors.white },
                contentStyle: { backgroundColor: Colors.white },
            }}
        >
            <Stack.Screen name="index" />

            <Stack.Screen name="register" />

            <Stack.Screen name="verify" />
        </Stack>
    );
}
