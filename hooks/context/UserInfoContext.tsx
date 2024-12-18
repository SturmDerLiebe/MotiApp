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
    useMemo,
    useState,
} from "react";

const TAG = "USE_USER_INFO_STATE >>>";

export interface UserInfoResponse {
    username: string;
    personalGoal: number;
    personalProgress: number;
    groupName: string;
    //Todo: settings: {}
}

const UserInfoContext = createContext<RequestStatus>(new RequestLoading());

export function useUserInfoContext() {
    return useContext(UserInfoContext);
}

const ControlUserInfoContext = createContext<[() => void, () => void]>([
    () => {},
    () => {},
]);

/**
 * @returns A Triple of `[requestUserInfo, cancelUserInfoRequest]`
 */
export function useControlUserInfoContext() {
    return useContext(ControlUserInfoContext);
}

export function UserInfoProvider({ children }: PropsWithChildren) {
    const { userInfoState, requestUserInfo, cancelUserInfoRequest } =
        useUserInfoState();

    return (
        <UserInfoContext.Provider value={userInfoState}>
            <ControlUserInfoContext.Provider
                value={[requestUserInfo, cancelUserInfoRequest]}
            >
                {children}
            </ControlUserInfoContext.Provider>
        </UserInfoContext.Provider>
    );
}

function useUserInfoState(): {
    userInfoState: RequestStatus;
    requestUserInfo: () => void;
    cancelUserInfoRequest: () => void;
} {
    let [userInfoState, setState] = useState<RequestStatus>(
        new RequestLoading(),
    );

    //TODO: To prevent having to useMemo and useCallback everything, the functions should be parameterized an put on the module scope
    const ABORT_CONTROLLER = useMemo(() => new AbortController(), []);

    return {
        userInfoState,

        requestUserInfo: useCallback(
            function () {
                setState(new RequestLoading());

                try {
                    handleResponse(ABORT_CONTROLLER.signal);
                } catch (error) {
                    handleError(error);
                }
            },
            [ABORT_CONTROLLER.signal],
        ),

        cancelUserInfoRequest: useCallback(() => {
            ABORT_CONTROLLER.abort();
        }, [ABORT_CONTROLLER]),
    };

    /**
     * @throws any {@link fetch} related Error
     * @throws any {@link Response}.json related Error
     */
    async function handleResponse(abortSignal: AbortSignal) {
        const RESPONSE = await UserRepository.getUserInfo(abortSignal);

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
