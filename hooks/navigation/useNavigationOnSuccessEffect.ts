import { RequestStatus, RequestSuccess } from "@/utils/RegistrationStatus";
import { Href, router } from "expo-router";
import { useEffect } from "react";

/**
 * Navigates to {@link route} **if and only if** {@link requestState} is `instanceof` {@link RequestSuccess}
 */
export default function useNavigateOnSuccessEffect(
  requestState: RequestStatus | null,
  route: Href<string | object>,
) {
  useEffect(() => {
    if (requestState instanceof RequestSuccess) {
      router.navigate(route);
    }
  }, [requestState, route]);
}
