import {
    ChatMessage,
    MessageType,
    NewChatMessage,
    RawExistingMessageData,
} from "@/data/DTO/ChatMessage";
import GroupRepository from "@/data/repository/GroupRepository";
import {
    useCameraContext,
    useCameraDispatchContext,
} from "@/hooks/context/CameraContext";
import { Logger } from "@/utils/Logging/Logger";
import { SocketInitialLoading, SocketStatus } from "@/utils/socket/status";
import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from "react";
import messagingReducer, { MessagingAction } from "./messagingReducer";

export type ChatMessageListItem = ChatMessage | string;

const TAG = "USE_RECEIVE_MESSAGES";

const MessagingContext = createContext([new SocketInitialLoading(), (newMessage: NewChatMessage)=>{}]);

export function useMessagingContext() {
    return useContext(MessagingContext);
}

const ControlMessagingContext = createContext([()=>{},()=>{}]);

export function useControlMessagingContext() {
    return useContext(ControlMessagingContext);
}

export function MessagingProvider({ children }: PropsWithChildren) {
    const {messagingState, sendNewMessage, startMessaging, cancelMessaging} = useMessaging()
    return (
        <MessagingContext.Provider value={[messagingState, sendMessage]}>
            <ControlMessagingContext.Provider value={[startMessaging, cancelMessaging]}>
                {children}
            </ControlMessagingContext.Provider>
        </MessagingContext.Provider>
    );
}

function useMessaging(): {
    messagingState: SocketStatus;
    startMessaging: () => void;
    cancelMessaging: () => void;
    sendNewMessage: (newMessage: NewChatMessage) => void;
} {
    const [messagingState, dispatchMessaging] = useReducer(
        messagingReducer,
        new SocketInitialLoading(),
    );

    useNewProgressEffect(dispatchMessaging);

    const INTERVAL_REF = useRef<NodeJS.Timeout>();

    return {
        messagingState,
        startMessaging: useCallback(() => {
            startSocketConnection({
                intervalId: INTERVAL_REF.current,
                setIntervalRef: (intervalId: NodeJS.Timeout) => {
                    INTERVAL_REF.current = intervalId;
                },
                dispatchMessageAction: dispatchMessaging,
            });
        }, []),
        cancelMessaging: useCallback(function () {
            Logger.logInfo(TAG, "Cancel Receiving Messages");
            clearInterval(INTERVAL_REF.current);
        }, []),
        sendNewMessage(newMessage: NewChatMessage): void {
            sendMessage(dispatchMessaging, newMessage);
        },
    };
}

function useNewProgressEffect(
    dispatchMessaging: React.Dispatch<MessagingAction>,
) {
    const { cameraIsActive, imageUri } = useCameraContext();
    const dispatchCameraAction = useCameraDispatchContext();

    useEffect(() => {
        if (imageUri !== null && !cameraIsActive) {
            const NEW_MESSAGE = new NewChatMessage(
                imageUri,
                MessageType.IMAGE,
                true,
            );
            sendMessage(dispatchMessaging, NEW_MESSAGE);
            dispatchCameraAction({ type: "ConsumeImageUri" });
        }
    }, [cameraIsActive, imageUri, dispatchCameraAction, dispatchMessaging]);
}

function sendMessage(
    dispatchMessaging: React.Dispatch<MessagingAction>,
    NEW_MESSAGE: NewChatMessage,
) {
    dispatchMessaging({
        type: "SendNewMessage",
        newPayload: NEW_MESSAGE,
    });
    //TODO: To save Free Api Requests this is commented out:
    // GroupRepository.sendMessage(
    //     NEW_MESSAGE.transformToRawChatMessage(),
    // );
}

async function startSocketConnection({
    intervalId,
    setIntervalRef,
    dispatchMessageAction,
}: {
    intervalId: NodeJS.Timeout | undefined;
    setIntervalRef: (interval: NodeJS.Timeout) => void;
    dispatchMessageAction: React.Dispatch<MessagingAction>;
}) {
    function handleError(error: Error) {
        Logger.logError(
            TAG,
            "There was an Error during the connection to a socket:",
            error,
        );
        dispatchMessageAction({ type: "BadConnection" });
    }

    Logger.logInfo(TAG, "Start Receiving Messages");
    try {
        handleResponse({
            setIntervalRef,
            dispatchMessageAction,
        });
    } catch (error) {
        handleError(error as Error);
        clearInterval(intervalId);
    }
}

/**
 * @throws any {@link fetch} related Error
 * @throws any {@link Response}.json related Error
 */
async function handleResponse({
    setIntervalRef,
    dispatchMessageAction,
}: {
    setIntervalRef: (interval: NodeJS.Timeout) => void;
    dispatchMessageAction: React.Dispatch<MessagingAction>;
}) {
    const RESPONSE = await GroupRepository.receiveExistingMessages(); // TODO: This should arrive sorted from BE

    //TODO: socket.on('listSuccess')
    if (RESPONSE.ok) {
        const RAW_MESSAGES: RawExistingMessageData[] = await RESPONSE.json();

        dispatchMessageAction({
            type: "ExistingMessagesArrived",
            newPayload: RAW_MESSAGES,
        });

        startFetchingNewMessages({ setIntervalRef, dispatchMessageAction });
    } else {
        //TODO: socket.on('error')
        dispatchMessageAction({ type: "BadResponse" });
    }
}

function startFetchingNewMessages({
    setIntervalRef,
    dispatchMessageAction,
}: {
    setIntervalRef: (interval: NodeJS.Timeout) => void;
    dispatchMessageAction: React.Dispatch<MessagingAction>;
}) {
    const INTERVAL = setInterval(async function () {
        const RESPONSE = await GroupRepository.receiveNewMessages();

        //TODO: socket.on('listSuccess')
        if (RESPONSE.ok) {
            //NOTE: Our Mock API returns a non Array JSON Response for single element Requests. This needs to be changed with the real implementation.
            const DATA: RawExistingMessageData = await RESPONSE.json();

            dispatchMessageAction({
                type: "NewMessagesArrived",
                newPayload: DATA,
            });
        } else {
            //TODO: socket.on('error')
            dispatchMessageAction({ type: "BadResponse" });
        }
    }, 5000);

    setIntervalRef(INTERVAL);
}
