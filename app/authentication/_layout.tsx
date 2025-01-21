import { MotiColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthenticationLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTintColor: MotiColors.blue.dark,
                headerTitle: "",
                headerStyle: { backgroundColor: MotiColors.white },
                contentStyle: { backgroundColor: MotiColors.white },
            }}
        >
            <Stack.Screen name="index" />

            <Stack.Screen name="register" />

            <Stack.Screen name="verify" />
        </Stack>
    );
}
