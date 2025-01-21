import { MotiColors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function GroupSelectionLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTintColor: MotiColors.blue.dark,
                headerTitle: "",
                //TODO: Use HeaderRight to show custom Button
                headerStyle: { backgroundColor: MotiColors.white },
                contentStyle: { backgroundColor: MotiColors.white },
                presentation: "modal",
            }}
        >
            {/* <Stack.Screen name="index" /> */}
            <Stack.Screen name="create" />
            <Stack.Screen name="invite" />
        </Stack>
    );
}
