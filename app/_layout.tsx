import { Colors } from "@/constants/Colors";
import { useLoadFonts } from "@/constants/Fonts";
import { UserInfoProvider } from "@/hooks/context/UserInfoContext";
import { Logger } from "@/utils/Logging/Logger";
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

    const [isLoaded, error] = useLoadFonts();

    useEffect(() => {
        if (error !== null) {
            Logger.logError(TAG, "There was an error loading Fonts", error);
        } else {
            setAppIsReady(isLoaded);
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
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen
                name="authentication"
                options={{ headerShown: false }}
            />

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
