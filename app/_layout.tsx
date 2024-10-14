import { Colors } from "@/constants/Colors";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
} from "@expo-google-fonts/space-mono";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  let [isLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  return isLoaded ? (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: Colors.blue.dark,
        headerTitle: "",
        //TODO: Use HeaderRight to show custom Button
        headerStyle: { backgroundColor: Colors.white },
        contentStyle: { backgroundColor: Colors.white },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="initial-personal-goal" />
      <Stack.Screen name="initial-group" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  ) : (
    // TODO: Use SplashScreen here
    <Text>{error?.name + " " + error?.message}</Text>
  );
}
