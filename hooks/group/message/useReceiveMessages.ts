import { ChatMessageDAO } from "@/data/DataAccessObjects/ChatMessageDAO";
import GroupRepository from "@/data/repository/GroupRepository";
import { NetworkError } from "@/utils/RequestStatus";
import {
  SocketConnectionLoading,
  SocketStatus,
  SocketListSuccess,
  SocketError,
} from "@/utils/socket/status";
import { useState } from "react";

const TAG = "USE_RECEIVE_MESSAGES >>>";

export default function useReceiveMessageState(): [
  SocketStatus,
  (groupId: string) => void,
] {
  let [receiveMessageState, setReceiveMessageState] = useState<SocketStatus>(
    new SocketConnectionLoading(),
  );

  let intervalId: NodeJS.Timeout;

  return [receiveMessageState, startSocketConnection];

  async function startSocketConnection(groupId: string) {
    try {
      handleResponse(groupId);
    } catch (error) {
      handleError(error);
    } finally {
      clearInterval(intervalId);
    }
  }

  /**
   * @throws any {@link fetch} related Error
   * @throws any {@link Response}.json related Error
   */
  async function handleResponse(groupId: string) {
    const RESPONSE = await GroupRepository.receiveExistingMessages(groupId);

    //TODO: socket.on('listSuccess')
    if (RESPONSE.ok) {
      const DATA: ChatMessageDAO[] = await RESPONSE.json();
      setReceiveMessageState(new SocketListSuccess(DATA));

      startFetchingNewMessages(groupId);
    } else {
      //TODO: socket.on('error')
      setReceiveMessageState(
        new SocketError(1003),
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
    setReceiveMessageState(new NetworkError());
  }

  function startFetchingNewMessages(groupId: string) {
    intervalId = setInterval(async function () {
      const RESPONSE = await GroupRepository.receiveNewMessages(groupId);

      //TODO: socket.on('listSuccess')
      if (RESPONSE.ok) {
        const DATA: ChatMessageDAO[] = await RESPONSE.json();
        setReceiveMessageState(new SocketListSuccess(DATA));
      } else {
        //TODO: socket.on('error')
        setReceiveMessageState(
          new SocketError(1003),
          // SocketError.determineGeneralErrorMessage(RESPONSE.status, TAG),
        );
      }
    }, 5000);
  }
}
