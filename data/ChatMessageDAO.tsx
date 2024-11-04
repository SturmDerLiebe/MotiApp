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

export abstract class ChatMessageDAO {
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

export class TextMessageDAO extends ChatMessageDAO {
  constructor(
    author: string,
    timestamp: string,
    public text: string,
  ) {
    super(author, timestamp);
  }
}

export class ImageMessageDAO extends ChatMessageDAO {
  constructor(
    author: string,
    timestamp: string,
    public imageUri: string,
  ) {
    super(author, timestamp);
  }
}
