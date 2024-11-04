import { ChatMessageDAO } from "@/data/DataAccessObjects/ChatMessageDAO";

export interface SocketStatus {}

export class SocketConnectionLoading implements SocketStatus {}

export class SocketListSuccess implements SocketStatus {
  constructor(public payload: ChatMessageDAO[]) {}
}

export class SocketFailure implements SocketStatus {}

export class SocketError implements SocketStatus {
  constructor(public code: number) {}
}
