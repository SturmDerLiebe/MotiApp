import GroupRepository from "@/data/repository/GroupRepository";
import {
  NetworkError,
  RequestError,
  RequestLoading,
  RequestStatus,
  RequestSuccess,
} from "@/utils/RegistrationStatus";
import { useState } from "react";

const TAG = "USE_GROUP_JOIN >>>";

export default function useGroupJoinState(): [
  RequestStatus | null,
  (joinCode: string) => void,
] {
  let [groupJoinState, setGroupJoinState] = useState<RequestStatus | null>(
    null,
  );

  return [groupJoinState, startGroupJoining];

  async function startGroupJoining(joinCode: string) {
    setGroupJoinState(new RequestLoading());

    try {
      handleResponse(joinCode);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * @throws any {@link fetch} related Error
   * @throws any {@link Response}.json related Error
   */
  async function handleResponse(joinCode: string) {
    const RESPONSE = await GroupRepository.join(joinCode);

    if (RESPONSE.ok) {
      setGroupJoinState(new RequestSuccess());
    } else {
      setGroupJoinState(
        new RequestError(
          RequestError.determineGeneralErrorMessage(RESPONSE.status, TAG),
        ),
      );
    }
  }

  function handleError(error: unknown) {
    console.error(
      TAG,
      "There was an Error during the Request to add this user to a group:",
      error,
    );
    setGroupJoinState(new NetworkError());
  }
}
