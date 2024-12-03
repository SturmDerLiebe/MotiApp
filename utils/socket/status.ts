import { ChatMessageListItem } from "@/hooks/group/message/useReceiveMessages";

export interface SocketStatus {
  mostRecentPayload: ChatMessageListItem[];
}

export class SocketInitialLoading implements SocketStatus {
  mostRecentPayload: ChatMessageListItem[] = [];
}

export class SocketListSuccess implements SocketStatus {
  constructor(public mostRecentPayload: ChatMessageListItem[]) {}
}

export class SocketListUpdateInitiated implements SocketStatus {
  constructor(public mostRecentPayload: ChatMessageListItem[]) {}
}

export class SocketFailure implements SocketStatus {
  constructor(public mostRecentPayload: ChatMessageListItem[]) {}
}

export class SocketError implements SocketStatus {
  constructor(
    public code: number,
    public mostRecentPayload: ChatMessageListItem[],
  ) {}
}
