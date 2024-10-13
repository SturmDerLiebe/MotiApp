import { GroupCreationResponse } from "@/hooks/group/useGroupCreationState";

export interface RequestStatus {}
//TODO: interface RequestErrorStatus

export class RequestSuccess implements RequestStatus {}
export class GroupCreationSuccess extends RequestSuccess {
  joinCode: string;

  constructor(body: GroupCreationResponse) {
    super();
    this.joinCode = body.joinCode;
  }
}

export class RequestLoading implements RequestStatus {}

export class RequestError implements RequestStatus {
  constructor(public message: GeneralErrorMessage) {}

  static determineGeneralErrorMessage(statusCode: number, tag: string) {
    switch (statusCode) {
      case 400:
        return GeneralErrorMessage.BAD_REQUEST;
      case 401:
        return GeneralErrorMessage.UNATUHORIZED;
      case 500:
        return GeneralErrorMessage.INTERNAL_SERVER_ERROR;
      default:
        console.error(
          tag,
          `An unhandled Error Code of ${statusCode} was received`,
        );
        return GeneralErrorMessage.UNKOWN_ERROR;
    }
  }
}

export enum GeneralErrorMessage {
  BAD_REQUEST = "Some of your Input seems to be having an issue",
  UNKOWN_ERROR = "Something went wrong :(",
  INTERNAL_SERVER_ERROR = "Our Server seems to have some Issues. Please try again later!",
  UNATUHORIZED = "You seem to have been logged out. Please log back in again!",
}

export class NetworkError implements RequestStatus {
  public message =
    "There seems to be an issue with your connection. Please try again!";
}

export function isFailedRequest(status: RequestStatus | null): boolean {
  return status instanceof RequestError || status instanceof NetworkError;
}
