import {
    ExistingChatMessage,
    NewChatMessage,
    RawExistingMessageData,
    transformRawToUIMessageList,
} from "@/data/DTO/ChatMessage";
import { spliceChatMessageListWithDates } from "@/utils/ChatMessage/helper";
import {
    SocketError,
    SocketListSuccess,
    SocketListUpdateInitiated,
    SocketStatus,
} from "@/utils/socket/status";

export type MessagingAction =
    | {
          type: "ExistingMessagesArrived";
          newPayload: RawExistingMessageData[];
      }
    | { type: "NewMessagesArrived"; newPayload: RawExistingMessageData }
    | { type: "SendNewMessage"; newPayload: NewChatMessage }
    | { type: "BadResponse" }
    | { type: "BadConnection" };

/**
 * **Preformance Notice:**
 * This function needs to create a new object for the `mostRecentPayload`, since {@link FlashList} will not rerender otherwise.
 */
export default function messagingReducer(
    { mostRecentPayload }: SocketStatus,
    action: MessagingAction,
): SocketStatus {
    switch (action.type) {
        case "ExistingMessagesArrived": {
            return new SocketListSuccess(
                spliceChatMessageListWithDates(
                    transformRawToUIMessageList(action.newPayload),
                ),
            );
        }
        case "NewMessagesArrived": {
            return new SocketListSuccess([
                ...mostRecentPayload,
                new ExistingChatMessage(action.newPayload),
            ]);
        }
        case "SendNewMessage": {
            return new SocketListUpdateInitiated([
                ...mostRecentPayload,
                action.newPayload,
            ]);
        }
        case "BadResponse": {
            return new SocketError(1003, mostRecentPayload);
        }
        case "BadConnection": {
            return new SocketError(1008, mostRecentPayload);
        }
    }
}
