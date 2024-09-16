import UserRepository, {
  RegistrationDetails,
} from "@/data/repository/UserRepository";
import { useState } from "react";

const TAG = "USE_REGISTRATION_STATE >>>";

export default function useRegistrationState(): [
  RegistrationStatus | null,
  (details: RegistrationDetails) => void,
] {
  let [state, setState] = useState<RegistrationStatus | null>(null);
  return [
    state,
    async function (details: RegistrationDetails) {
      setState(new RegistrationLoading());
      try {
        handleResponse();
      } catch (error) {
        handleError(error);
      }

      async function handleResponse() {
        const RESPONSE = await UserRepository.registerUser(details);
        if (RESPONSE.ok) {
          // TODO: Navigate to next Screen
          setState(new RegistrationSuccess());
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
        setState(new NetworkFailure());
      }
    },
  ];
}

interface RegistrationStatus {
  state: BasicRequestState;
  message?: RegistrationErrorMessages;
}

//TODO: Can we geet rid of state field?

class RegistrationSuccess implements RegistrationStatus {
  state = BasicRequestState.SUCCESS;
}

class RegistrationLoading implements RegistrationStatus {
  state = BasicRequestState.LOADING;
}

class RegistrationFailure implements RegistrationStatus {
  state = BasicRequestState.FAILURE;
  message: RegistrationErrorMessages;
  constructor(statusCode: number) {
    this.message = RegistrationErrorMessages.UNKOWN_ERROR;

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

class NetworkFailure implements RegistrationStatus {
  state = BasicRequestState.NETWORK_ERROR;
  message = RegistrationErrorMessages.NETWORK_ERROR;
}

enum BasicRequestState {
  LOADING,
  FAILURE,
  SUCCESS,
  NETWORK_ERROR,
}

enum RegistrationErrorMessages {
  BAD_REQUEST = "Some of your Input seems to be have an issue",
  CONFLICT = "This email is already in use",
  INTERNAL_SERVER_ERROR = "Our Server seems to have some Issues. Please try again later!",
  UNKOWN_ERROR = "Something went wrong :(",
  NETWORK_ERROR = "There seems to be an issue with your connection. Please try again!",
}

export {
  NetworkFailure,
  RegistrationFailure,
  RegistrationLoading,
  RegistrationSuccess,
};
