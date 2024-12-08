import {
  ChatMessage,
  ExistingChatMessage,
  NewChatMessage,
  RawExistingMessageData,
  transformRawToUIMessageList,
} from "@/data/DTO/ChatMessage";
import GroupRepository from "@/data/repository/GroupRepository";
import { spliceChatMessageListWithDates } from "@/utils/ChatMessage/helper";
import { Logger } from "@/utils/Logging/Logger";
import {
  SocketInitialLoading,
  SocketStatus,
  SocketListSuccess,
  SocketError,
  SocketListUpdateInitiated,
} from "@/utils/socket/status";
import { useCallback, useRef, useState } from "react";

export type ChatMessageListItem = ChatMessage | string;

const TAG = "USE_RECEIVE_MESSAGES";

/**
 * @returns A Tuple of the current state and three functions to handle Message SocketInitialLoading
 * @example
 * ```typescript
 * [receivedMessageState, startReceivingMessages(), stopReceivingMessages(), sendNewMessage()] = useReceiveMessageState()
 * ```
 */
export default function useReceiveMessageState(): [
  SocketStatus,
  () => void,
  () => void,
  (newMessage: NewChatMessage) => void,
] {
  let [receivedMessageState, setReceivedMessageState] = useState<SocketStatus>(
    new SocketInitialLoading(),
  );

  const INTERVAL_REF = useRef<NodeJS.Timeout>();

  return [
    receivedMessageState,
    useCallback(startSocketConnection, []),
    useCallback(function stopReceivingMessages() {
      Logger.logInfo(TAG, "Start Receiving Messages");
      clearInterval(INTERVAL_REF.current);
    }, []),
    /**
     * **Preformance Notice:**
     * This function needs to create a new object for the `mostRecentPayload`, since {@link FlashList} will not rerender otherwise.
     */
    function mergeNewMessageInput(newMessage: NewChatMessage): void {
      setReceivedMessageState((currentState) => {
        return new SocketListUpdateInitiated([
          ...currentState.mostRecentPayload,
          newMessage,
        ]);
      });
    },
  ];

  async function startSocketConnection() {
    Logger.logInfo(TAG, "Cancel Receiving Messages");
    try {
      handleResponse();
    } catch (error) {
      handleError(error);
      clearInterval(INTERVAL_REF.current);
    }

    /**
     * @throws any {@link fetch} related Error
     * @throws any {@link Response}.json related Error
     */
    async function handleResponse() {
      const RESPONSE = await GroupRepository.receiveExistingMessages(); // TODO: This should arrive sorted from BE

      //TODO: socket.on('listSuccess')
      if (RESPONSE.ok) {
        const RAW_MESSAGES: RawExistingMessageData[] = await RESPONSE.json();
        const MESSAGES = transformRawToUIMessageList(RAW_MESSAGES);

        const DATE_SPLICED_DATA = spliceChatMessageListWithDates(MESSAGES);

        setReceivedMessageState(new SocketListSuccess(DATE_SPLICED_DATA));

        startFetchingNewMessages();
      } else {
        //TODO: socket.on('error')
        setReceivedMessageState(
          (currentState) =>
            new SocketError(1003, currentState.mostRecentPayload),
          // SocketError.determineGeneralErrorMessage(RESPONSE.status, TAG),
        );
      }

      function startFetchingNewMessages() {
        INTERVAL_REF.current = setInterval(async function () {
          const RESPONSE = await GroupRepository.receiveNewMessages();

          //TODO: socket.on('listSuccess')
          if (RESPONSE.ok) {
            //NOTE: Our Mock API returns a non Array JSON Response for single element Requests. This needs to be changed with the real implementation.
            const DATA: RawExistingMessageData = await RESPONSE.json();

            setReceivedMessageState(
              ({ mostRecentPayload }) =>
                new SocketListSuccess([
                  ...mostRecentPayload,
                  new ExistingChatMessage(DATA),
                ]),
            );
          } else {
            //TODO: socket.on('error')
            setReceivedMessageState(
              (currentState) =>
                new SocketError(1003, currentState.mostRecentPayload),
              // SocketError.determineGeneralErrorMessage(RESPONSE.status, TAG),
            );
          }
        }, 5000);
      }
    }

    function handleError(error: unknown) {
      console.error(
        TAG,
        "There was an Error during the connection to a socket:",
        error,
      );
      setReceivedMessageState(
        (currentState) => new SocketError(1008, currentState.mostRecentPayload),
      );
    }
  }
}
