import type { SessionRepositoryInterface } from "motidata";
import { SECURE_STORE_KEY } from "@/constants/secureStore/SecureStoreKeys";
import * as SecureStore from "expo-secure-store";

export class SessionRepository implements SessionRepositoryInterface {
    private sessionId: string | null = null;

    /**
     * Saves the SessionId to cache and {@link SecureStore}.
     * @throws any {@link SecureStore} related Error
     */
    async saveSessionId(sessionId: string) {
        this.sessionId = sessionId;
        return await SecureStore.setItemAsync(
            SECURE_STORE_KEY.sessionId,
            sessionId,
        );
    }

    /**
     * Retrieves the SessionId from cache if present, else from {@link SecureStore}.
     * @throws any {@link SecureStore} related Error
     */
    async readSessionId(): Promise<string> {
        return (
            this.sessionId ??
            (await SecureStore.getItemAsync(SECURE_STORE_KEY.sessionId)) ??
            ""
        );
    }

    /*
     * @throws any {@link SecureStore} related Error
     */
    async hasValidSessionId(): Promise<boolean> {
        return (await this.readSessionId()).trim().length > 0;
    }
}
