// NOTE: OPTIMIZATION idea - Use .formatToParts() with only one formatter and pick the neccessary parts accordingly
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

export abstract class ChatMessage {
  private timestamp: Date;

  public dateString: string;
  public timeString: string;

  constructor(
    public author: string,
    timestamp: string,
  ) {
    this.timestamp = new Date(timestamp);
    this.dateString = DATE_FORMATTER.format(this.timestamp);
    this.timeString = TIME_FORMATTER.format(this.timestamp);
  }
}

export class TextMessage extends ChatMessage {
  constructor(
    author: string,
    timestamp: string,
    public text: string,
  ) {
    super(author, timestamp);
  }
}

export class ImageMessage extends ChatMessage {
  constructor(
    author: string,
    timestamp: string,
    public imageURL: string,
  ) {
    super(author, timestamp);
  }
}
