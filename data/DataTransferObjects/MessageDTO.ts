export interface MessageDTO {
  groupId: string;
  timestamp: string;
  content: string | Blob;
}

export class SingleMessageDTO implements MessageDTO {
  constructor(
    public groupId: string,
    public timestamp: string,
    public content: string,
  ) {}
}

export class SingleImageDTO implements MessageDTO {
  constructor(
    public groupId: string,
    public timestamp: string,
    public content: Blob,
  ) {}
}
