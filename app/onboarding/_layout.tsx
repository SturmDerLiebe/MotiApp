import { MotiColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: MotiColors.white },
            }}
        >
            <Stack.Screen name="index" />

            <Stack.Screen name="goal-explainer" />

            <Stack.Screen name="success-explainer" />
        </Stack>
    );
}
