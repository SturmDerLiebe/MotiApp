import UserRepository, {
  RegistrationDetails,
} from "@/data/repository/UserRepository";
import { useState } from "react";
import {
  RequestStatus,
  RequestLoading,
  RequestSuccess,
  NetworkError,
  GeneralErrorMessage,
} from "@/utils/RegistrationStatus";

const TAG = "USE_REGISTRATION_STATE >>>";

export default function useRegistrationState(): [
  RequestStatus | null,
  (details: RegistrationDetails) => void,
] {
  let [state, setState] = useState<RequestStatus | null>(null);

  return [
    state,
    async function (details: RegistrationDetails) {
      setState(new RequestLoading());
      try {
        handleRequest(details);
      } catch (error) {
        handleError(error);
      }
    },
  ];

  async function handleRequest(details: RegistrationDetails) {
    const RESPONSE = await UserRepository.registerUser(details);
    if (RESPONSE.ok) {
      setState(new RequestSuccess());
    } else {
      setState(new RegistrationFailure(RESPONSE.status));
    }
  }

  function handleError(error: unknown) {
    console.error(
      TAG,
      "There was an Error during the registration Request:",
      error,
    );
    setState(new NetworkError());
  }
}

export class RegistrationFailure implements RequestStatus {
  message: GeneralErrorMessage | RegistrationErrorMessages;
  constructor(statusCode: number) {
    switch (statusCode) {
      case 400:
        this.message = RegistrationErrorMessages.BAD_REQUEST;
        break;
      case 409:
        this.message = RegistrationErrorMessages.CONFLICT;
        break;
      case 500:
        this.message = RegistrationErrorMessages.INTERNAL_SERVER_ERROR;
        break;
      default:
        this.message = RegistrationErrorMessages.UNKOWN_ERROR;
        console.error(
          TAG,
          `An unhandled Error Code of ${statusCode} was received`,
        );
    }
  }
}

export enum RegistrationErrorMessages {
  BAD_REQUEST = "Some of your Input seems to be have an issue",
  CONFLICT = "This email is already in use",
  INTERNAL_SERVER_ERROR = "Our Server seems to have some Issues. Please try again later!",
  UNKOWN_ERROR = "Something went wrong :(",
  NETWORK_ERROR = "There seems to be an issue with your connection. Please try again!",
}
