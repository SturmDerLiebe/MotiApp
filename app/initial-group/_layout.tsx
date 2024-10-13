import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: Colors.blue.dark,
        headerTitle: "",
        //TODO: Use HeaderRight to show custom Button
        headerStyle: { backgroundColor: Colors.white },
        contentStyle: { backgroundColor: Colors.white },
        presentation: "modal",
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="create" />
      <Stack.Screen name="invite" />
    </Stack>
  );
}
