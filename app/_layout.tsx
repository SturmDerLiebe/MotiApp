import { Colors } from "@/constants/Colors";
import { UserInfoProvider } from "@/hooks/context/UserInfoContext";
import { Logger } from "@/utils/Logging/Logger";
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
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "react-native";

const TAG = "ROOT_LAYOUT";

SplashScreen.preventAutoHideAsync();

export default function RootLayoutWrapper() {
    NavigationBar.setBackgroundColorAsync(Colors.white);

    return (
        <UserInfoProvider>
            <RootLayout />
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.transparent}
                translucent
            />
        </UserInfoProvider>
    );
}

function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);

    useLayoutEffect(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    const [isLoaded, error] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        SpaceMono_400Regular,
        SpaceMono_700Bold,
    });

    useEffect(() => {
        if (error !== null) {
            Logger.logError(TAG, "There was an error loading Fonts", error);
        } else {
            setAppIsReady(true);
        }
    }, [setAppIsReady, error, isLoaded]);

    return appIsReady ? (
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

            <Stack.Screen
                name="initial-group"
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="groupInfo"
                options={{
                    headerShown: false,
                    presentation: "transparentModal",
                    contentStyle: { backgroundColor: Colors.transparent },
                }}
            />
        </Stack>
    ) : null;
}
