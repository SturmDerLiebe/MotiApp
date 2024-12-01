// NOTE: OPTIMIZATION idea - Use .formatToParts() with only one formatter and pick the neccessary parts accordingly
//
// NOTE: Using undefined for now until custom timezone is specified
const DATE_FORMATTER = Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});
const TIME_FORMATTER = Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

export enum MessageType {
  TEXT,
  IMAGE,
}

export class ChatMessageDAO {
  public time: string;
  public date: string;

  constructor(
    /**
     * Nullable `string` to allow for new messages not synced with the backend without a {@link messageId}.
     */
    public messageId: string | null,
    public author: string,
    timestamp: string,
    public content: string,
    public type: MessageType,
  ) {
    const INSTANT = new Date(timestamp);
    this.date = DATE_FORMATTER.format(INSTANT);
    this.time = TIME_FORMATTER.format(INSTANT);
  }
}
