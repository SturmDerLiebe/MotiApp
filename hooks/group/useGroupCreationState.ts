import GroupRepository from "@/data/repository/GroupRepository";
import {
  GroupCreationSuccess,
  NetworkError,
  RequestError,
  RequestLoading,
  RequestStatus,
} from "@/utils/RegistrationStatus";
import { useState } from "react";

const TAG = "USE_GROUP_CREATION >>>";

export type GroupCreationResponse = { joinCode: string };

export default function useGroupCreationState(): [
  RequestStatus | null,
  (groupName: string) => void,
] {
  let [groupCreationState, setGroupCreationState] =
    useState<RequestStatus | null>(null);

  return [groupCreationState, startGroupCreation];

  async function startGroupCreation(groupName: string) {
    setGroupCreationState(new RequestLoading());

    try {
      handleResponse(groupName);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * @throws any {@link fetch} related Error
   * @throws any {@link Response}.json related Error
   */
  async function handleResponse(groupName: string) {
    const RESPONSE = await GroupRepository.create(groupName);

    if (RESPONSE.ok) {
      const DATA: GroupCreationResponse = await RESPONSE.json();
      setGroupCreationState(new GroupCreationSuccess(DATA));
    } else {
      setGroupCreationState(
        new RequestError(
          RequestError.determineGeneralErrorMessage(RESPONSE.status, TAG),
        ),
      );
    }
  }

  function handleError(error: unknown) {
    console.error(
      TAG,
      "There was an Error during the Request to create a group:",
      error,
    );
    setGroupCreationState(new NetworkError());
  }
}
