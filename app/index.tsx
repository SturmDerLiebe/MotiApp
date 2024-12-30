import SessionRepository from "@/data/repository/SessionRepository";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function InitialReroute() {
    const [sessionIdExists, setIfSessionIdExists] = useState(false);

    useEffect(() => {
        SessionRepository.findSessionId().then((sessionId) => {
            setIfSessionIdExists(sessionId !== null);
        });
    }, [setIfSessionIdExists]);

    return sessionIdExists ? (
        <Redirect href="/(tabs)" />
    ) : (
        <Redirect href="/authentication" />
    );
}
