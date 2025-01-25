import { RequestStatus, RequestSuccess } from "@/utils/RequestStatus";
import { Href, router } from "expo-router";
import { useEffect } from "react";

/**
 * Navigates to {@link route} **if and only if** {@link requestState} is `instanceof` {@link RequestSuccess}
 */
export default function useNavigateOnSuccessEffect(
    requestState: RequestStatus | null,
    route: Href,
) {
    useEffect(() => {
        if (requestState instanceof RequestSuccess) {
            router.navigate(route);
        }
    }, [requestState, route]);
}

/**
 * Navigates to {@link route} **if and only if** {@link responseWasOk} is true.
 */
export function useNavigateOnSuccessEffectNew(
    responseWasOk: boolean,
    route: Href,
) {
    useEffect(() => {
        if (responseWasOk) {
            router.push(route);
        }
    }, [responseWasOk, route]);
}
