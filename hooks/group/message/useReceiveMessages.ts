import {
  ChatMessage,
  ExistingChatMessage,
  NewChatMessage,
  RawExistingMessageData,
  transformRawToUIMessage,
} from "@/data/DTO/ChatMessage";
import GroupRepository from "@/data/repository/GroupRepository";
import { spliceChatMessageListWithDates } from "@/utils/ChatMessage/helper";
import {
  SocketInitialLoading,
  SocketStatus,
  SocketListSuccess,
  SocketError,
  SocketListUpdateInitiated,
} from "@/utils/socket/status";
import { useState } from "react";

export type ChatMessageListItem = ChatMessage | string;

const TAG = "USE_RECEIVE_MESSAGES >>>";

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

  let intervalId: NodeJS.Timeout;

  return [
    receivedMessageState,
    startSocketConnection,
    function stopReceivingMessages() {
      clearInterval(intervalId);
    },
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
    try {
      handleResponse();
    } catch (error) {
      handleError(error);
      clearInterval(intervalId);
    }
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
      const MESSAGES = transformRawToUIMessage(RAW_MESSAGES);

      const DATE_SPLICED_DATA = spliceChatMessageListWithDates(MESSAGES);

      setReceivedMessageState(new SocketListSuccess(DATE_SPLICED_DATA));

      startFetchingNewMessages();
    } else {
      //TODO: socket.on('error')
      setReceivedMessageState(
        (currentState) => new SocketError(1003, currentState.mostRecentPayload),
        // SocketError.determineGeneralErrorMessage(RESPONSE.status, TAG),
      );
    }

    function startFetchingNewMessages() {
      intervalId = setInterval(async function () {
        const RESPONSE = await GroupRepository.receiveNewMessages();

        //TODO: socket.on('listSuccess')
        if (RESPONSE.ok) {
          const DATA: ExistingChatMessage[] = await RESPONSE.json();

          setReceivedMessageState(
            (currentState) =>
              new SocketListSuccess([
                ...currentState.mostRecentPayload,
                ...DATA,
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
