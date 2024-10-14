import UserRepository from "@/data/repository/UserRepository";
import {
  NetworkError,
  RequestError,
  RequestLoading,
  RequestStatus,
  UserInfoSuccess,
} from "@/utils/RegistrationStatus";
import { useCallback, useState } from "react";

const TAG = "USE_USER_INFO_STATE >>>";

export type UserInfoResponse = {
  username: string;
  personalGoal: number;
  personalProgress: number;
};

export default function useUserInfoState(): [RequestStatus, () => void] {
  const sessionID = "123456789"; //TODO: Save and retrieve Session ID

  let [userInfoState, setState] = useState<RequestStatus>(new RequestLoading());

  return [userInfoState, useCallback(startUserInfoRequest, [])];

  async function startUserInfoRequest() {
    setState(new RequestLoading());

    try {
      handleResponse(sessionID);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * @throws any {@link fetch} related Error
   * @throws any {@link Response}.json related Error
   */
  async function handleResponse(sessionID: string) {
    const RESPONSE = await UserRepository.getUserInfo(sessionID);

    if (RESPONSE.ok) {
      const DATA: UserInfoResponse = await RESPONSE.json();
      setState(new UserInfoSuccess(DATA));
    } else {
      setState(
        new RequestError(
          RequestError.determineGeneralErrorMessage(RESPONSE.status, TAG),
        ),
      );
    }
  }

  function handleError(error: unknown) {
    console.error(
      TAG,
      "There was an Error during the Request to set the user's personal Goal:",
      error,
    );
    setState(new NetworkError());
  }
}
