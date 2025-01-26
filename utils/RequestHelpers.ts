import { RawMessageData } from "@/data/DTO/ChatMessage";
import SessionRepository from "@/data/repository/SessionRepository";
import { RegistrationDetails } from "@/data/repository/UserRepository";
import { typeCheckEnvVariable } from "./TypeHelpers";
import { SafeDigits } from "./UtilityClasses";

type apiPaths =
    | "registration"
    | "activation"
    | "personal-goal"
    | "group"
    | "group/join"
    | `group/message`
    | "user-info";

const API_BASE_ROUTE = "https://my.api.mockaroo.com";

export async function buildBaseHeaders() {
    const SESSION_ID = await SessionRepository.findSessionId();
    const HEADERS = new Headers();
    HEADERS.append(
        "X-API-Key",
        typeCheckEnvVariable(
            process.env.EXPO_PUBLIC_MOCKAROO_KEY,
            "EXPO_PUBLIC_MOCKAROO_KEY",
        ),
    );

    if (SESSION_ID !== null) {
        HEADERS.append("Cookie", SESSION_ID);
    }
    return HEADERS;
}

/**
 * Builds a Request
 */
export function bulildRequest(
    route: apiPaths,
    method: "GET" | "POST" | "PUT" | "PATCH",
    queryParamPair: string,
    headers: Headers,
    body?: RegistrationDetails | SafeDigits | RawMessageData | string,
    signal?: AbortSignal,
) {
    return new Request(`${API_BASE_ROUTE}/${route}?${queryParamPair}`, {
        method,
        headers,
        body:
            method === "GET"
                ? undefined
                : JSON.stringify(body as NonNullable<typeof body>),
        signal: signal,
    });
}
