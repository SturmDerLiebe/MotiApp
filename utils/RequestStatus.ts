import { GroupCreationResponse } from "@/hooks/group/useGroupCreationState";
import { UserInfoResponse } from "@/hooks/context/UserInfoContext";

export abstract class RequestStatus {}

export class RequestSuccess implements RequestStatus {}
export class GroupCreationSuccess extends RequestSuccess {
    joinCode: string;

    constructor(body: GroupCreationResponse) {
        super();
        this.joinCode = body.joinCode;
    }
}
export class UserInfoSuccess
    extends RequestSuccess
    implements UserInfoResponse
{
    username: string;
    personalGoal: number;
    personalProgress: number;
    progress: number;
    groupName: string;

    constructor({
        username,
        personalGoal,
        personalProgress,
        groupName,
    }: UserInfoResponse) {
        super();
        this.username = username;
        this.personalGoal = personalGoal;
        this.personalProgress = personalProgress;
        this.progress = personalProgress / personalGoal;
        this.groupName = groupName;
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
