import UserRepository from "@/data/repository/UserRepository";
import {
  NetworkError,
  RequestError,
  RequestLoading,
  RequestStatus,
  RequestSuccess,
} from "@/utils/RegistrationStatus";
import { DigitString, SafeDigits } from "@/utils/UtilityClasses";
import { useState } from "react";

const TAG = "USE_PERSONAL_GOAL >>>";

export default function usePersonalGoal(): [
  RequestStatus | null,
  (personalGoalPerWeek: DigitString) => void,
] {
  let [verification, setState] = useState<RequestStatus | null>(null);

  return [verification, setVerification];

  async function setVerification({
    safeDigits: personalGoalPerWeek,
  }: DigitString) {
    setState(new RequestLoading());

    try {
      handleResponse(personalGoalPerWeek);
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * @throws any fetch related Error
   */
  async function handleResponse(personalGoalPerWeek: SafeDigits) {
    const RESPONSE =
      await UserRepository.updatePersonalGoal(personalGoalPerWeek);

    if (RESPONSE.ok) {
      setState(new RequestSuccess());
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
