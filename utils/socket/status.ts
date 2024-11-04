import { ChatMessageDAO } from "@/data/DataAccessObjects/ChatMessageDAO";

export interface SocketStatus {
  mostRecentPayload: ChatMessageDAO[];
}

export class SocketInitialLoading implements SocketStatus {
  mostRecentPayload: ChatMessageDAO[] = [];
}

export class SocketListSuccess implements SocketStatus {
  constructor(public mostRecentPayload: ChatMessageDAO[]) {}
}

export class SocketFailure implements SocketStatus {
  constructor(public mostRecentPayload: ChatMessageDAO[]) {}
}

export class SocketError implements SocketStatus {
  constructor(
    public code: number,
    public mostRecentPayload: ChatMessageDAO[],
  ) {}
}
