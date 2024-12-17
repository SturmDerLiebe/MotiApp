import * as SecureStore from "expo-secure-store";

const SECURE_STORE_KEY = { sessionId: "sessionId" };

class SessionRepository {
    sessionId: string | null = null;

    /**
     * Saves the SessionId if present to cache and {@link SecureStore}.
     * @throws any {@link SecureStore} related Error
     */
    async saveSessionId(sessionId: string | undefined) {
        if (typeof sessionId === "string") {
            this.sessionId = sessionId;
            return SecureStore.setItemAsync(
                SECURE_STORE_KEY.sessionId,
                sessionId,
            );
        }
    }

    /**
     * Retrieves the SessionId from cache if present, else from {@link SecureStore}.
     * @throws any {@link SecureStore} related Error
     */
    async findSessionId(): Promise<string | null> {
        return (
            this.sessionId ??
            SecureStore.getItemAsync(SECURE_STORE_KEY.sessionId)
        );
    }
}

/**
 * A Singleton Instance for dealing with Session related data
 */
export default new SessionRepository();
