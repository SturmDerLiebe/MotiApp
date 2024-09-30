import UserRepository, {
  type SafeDigits,
} from "@/data/repository/UserRepository";
import {
  GeneralErrorMessage,
  NetworkError,
  RequestError,
  RequestLoading,
  RequestStatus,
  RequestSuccess,
} from "@/utils/RegistrationStatus";
import { useState } from "react";

const TAG = "USE_VERIFICATION >>>";

export default function useVerification(): [
  RequestStatus | null,
  (verificationCode: SafeDigits) => void,
] {
  let [verification, setState] = useState<RequestStatus | null>(null);

  return [verification, setVerification];

  async function setVerification(verificationCode: SafeDigits) {
    if (verificationCode.length < 4) {
      setState(null);
      return;
    }

    setState(new RequestLoading());

    try {
      handleResponse(verificationCode);
    } catch (error) {
      handleError(error);
    }
  }

  async function handleResponse(verificationCode: SafeDigits) {
    const RESPONSE = await UserRepository.verifyUser(verificationCode);
    if (RESPONSE.ok) {
      setState(new RequestSuccess());
    } else {
      setState(new VerificationError(RESPONSE.status));
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

export class VerificationError implements RequestStatus {
  message: GeneralErrorMessage | VerificationErrorMessage;

  constructor(statusCode: number) {
    this.message =
      statusCode === 401
        ? VerificationErrorMessage.UNAUTHORIZED
        : RequestError.determineGeneralErrorMessage(statusCode, TAG);
  }
}

enum VerificationErrorMessage {
  UNAUTHORIZED = "The Verification Code you supplied was wrong. Please try again!",
}
