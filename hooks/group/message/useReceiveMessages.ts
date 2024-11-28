import { ChatMessageDAO } from "@/data/DataAccessObjects/ChatMessageDAO";
import GroupRepository from "@/data/repository/GroupRepository";
import { spliceChatMessageListWithDates } from "@/utils/ChatMessage/helper";
import {
  SocketInitialLoading,
  SocketStatus,
  SocketListSuccess,
  SocketError,
} from "@/utils/socket/status";
import { useState } from "react";

const TAG = "USE_RECEIVE_MESSAGES >>>";

/**
 * @returns Triple of [receivedMessageState, startReceivingMessages(), stopReceivingMessages()]
 */
export default function useReceiveMessageState(): [
  SocketStatus,
  (groupId: string) => void,
  () => void,
] {
  let [receivedMessageState, setReceivedMessageState] = useState<SocketStatus>(
    new SocketInitialLoading(),
  );

  let intervalId: NodeJS.Timeout;

  return [
    receivedMessageState,
    startSocketConnection,
    () => clearInterval(intervalId),
  ];

  async function startSocketConnection(groupId: string) {
    try {
      handleResponse(groupId);
    } catch (error) {
      handleError(error);
      clearInterval(intervalId);
    }
  }

  /**
   * @throws any {@link fetch} related Error
   * @throws any {@link Response}.json related Error
   */
  async function handleResponse(groupId: string) {
    const RESPONSE = await GroupRepository.receiveExistingMessages(groupId); // TODO: This should arrive sorted from BE

    //TODO: socket.on('listSuccess')
    if (RESPONSE.ok) {
      const DATA: ChatMessageDAO[] = await RESPONSE.json();

      const DATE_SPLICED_DATA = spliceChatMessageListWithDates(DATA);

      setReceivedMessageState(new SocketListSuccess(DATE_SPLICED_DATA));

      startFetchingNewMessages(groupId);
    } else {
      //TODO: socket.on('error')
      setReceivedMessageState(
        (currentState) => new SocketError(1003, currentState.mostRecentPayload),
        // SocketError.determineGeneralErrorMessage(RESPONSE.status, TAG),
      );
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

  function startFetchingNewMessages(groupId: string) {
    intervalId = setInterval(async function () {
      const RESPONSE = await GroupRepository.receiveNewMessages(groupId);

      //TODO: socket.on('listSuccess')
      if (RESPONSE.ok) {
        const DATA: ChatMessageDAO[] = await RESPONSE.json();

        setReceivedMessageState(
          (currentState) =>
            new SocketListSuccess(mergePayloads(currentState, DATA)),
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

  function mergePayloads(
    currentState: SocketStatus,
    newData: ChatMessageDAO[],
  ) {
    currentState.mostRecentPayload.push(...newData);
    return currentState.mostRecentPayload;
  }
}

export type ChatMessageListItem = ChatMessageDAO | string;
