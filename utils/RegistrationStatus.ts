export interface RequestStatus {
  message?: string;
}
export class RequestSuccess implements RequestStatus {}
export class RequestLoading implements RequestStatus {}
export class RequestError implements RequestStatus {
  constructor(public message: GeneralErrorMessage) {}

  static determineGeneralErrorMessage(statusCode: number, tag: string) {
    switch (statusCode) {
      case 400:
        return GeneralErrorMessage.BAD_REQUEST;
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
}

export class NetworkError implements RequestStatus {
  public message =
    "There seems to be an issue with your connection. Please try again!";
}
