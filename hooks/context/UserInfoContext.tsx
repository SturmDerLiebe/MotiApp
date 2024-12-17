import UserRepository from "@/data/repository/UserRepository";
import {
    NetworkError,
    RequestError,
    RequestLoading,
    RequestStatus,
    UserInfoSuccess,
} from "@/utils/RequestStatus";
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

const TAG = "USE_USER_INFO_STATE >>>";

export interface UserInfoResponse {
    username: string;
    personalGoal: number;
    personalProgress: number;
    //TODO: Adjust Mockaroo
    groupName: string;
    //Todo: settings: {}
}

const UserInfoContext = createContext<RequestStatus>(new RequestLoading());

export function useUserInfoContext() {
    return useContext(UserInfoContext);
}

const RequestUserInfoContext = createContext<() => Promise<void>>(
    async () => {},
);

export function useRequestUserInfoContext() {
    return useContext(RequestUserInfoContext);
}

export function UserInfoProvider({ children }: PropsWithChildren) {
    const [userInfoState, requestUserInfo] = useUserInfoState();

    return (
        <UserInfoContext.Provider value={userInfoState}>
            <RequestUserInfoContext.Provider value={requestUserInfo}>
                {children}
            </RequestUserInfoContext.Provider>
        </UserInfoContext.Provider>
    );
}

function useUserInfoState(): [RequestStatus, () => Promise<void>] {
    let [userInfoState, setState] = useState<RequestStatus>(
        new RequestLoading(),
    );

    return [userInfoState, useCallback(startUserInfoRequest, [])];

    async function startUserInfoRequest() {
        setState(new RequestLoading());

        try {
            handleResponse();
        } catch (error) {
            handleError(error);
        }
    }

    /**
     * @throws any {@link fetch} related Error
     * @throws any {@link Response}.json related Error
     */
    async function handleResponse() {
        const RESPONSE = await UserRepository.getUserInfo();

        if (RESPONSE.ok) {
            const DATA: UserInfoResponse = await RESPONSE.json();
            setState(new UserInfoSuccess(DATA));
        } else {
            setState(
                new RequestError(
                    RequestError.determineGeneralErrorMessage(
                        RESPONSE.status,
                        TAG,
                    ),
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
