import { Assets } from "@/constants/Icons";
import SessionRepository from "@/data/repository/SessionRepository";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function InitialReroute() {
    const [sessionIdExists, setIfSessionIdExists] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        SessionRepository.findSessionId().then((sessionId) => {
            setIfSessionIdExists(sessionId !== null);
        });
    }, [setIfSessionIdExists]);

    switch (sessionIdExists) {
        case null:
            return <StartScreen />;
        case false:
            return <Redirect href="/onboarding" />;
        case true:
            return <Redirect href="/(tabs)" />;
    }
}

function StartScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Image
                source={Assets.SplashIcon}
                style={{ aspectRatio: 1, width: "50%" }}
            />
        </View>
    );
}
