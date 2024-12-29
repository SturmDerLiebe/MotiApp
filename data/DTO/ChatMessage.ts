/**
 * Interfaces extending {@link RawMessageData} represent a raw chat message data item in a Request from or Response to the API.
 */
export interface RawMessageData {
    timestamp: string;
    content: string | Blob;
    type: "TEXT" | "IMAGE";
    isMotiMateMessage: boolean;
}

/**
 * This interface describes the raw message data item from the API Response.
 */
export interface RawExistingMessageData extends RawMessageData {
    messageId: string;
    authorId: string | null;
    content: string;
    clapCount: number;
}

export function transformRawToUIMessageList(
    rawMessageItems: RawExistingMessageData[],
): ExistingChatMessage[] {
    return rawMessageItems.map(
        (rawMessage) => new ExistingChatMessage(rawMessage),
    );
}

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

export enum MessageType {
    TEXT,
    IMAGE,
}

/**
 * Classes inheriting {@link ChatMessage} contain the data used for displaying a chat message
 */
export abstract class ChatMessage {
    authorId: string | null;
    time: string;
    date: string;

    constructor(
        authorId: string | null,
        instant: Date,
        /**
         * Text or remote/local Image Uri
         */
        public content: string,
        public type: MessageType,
        public isMotiMateMessage: boolean,
    ) {
        this.authorId = authorId;
        this.date = DATE_FORMATTER.format(instant);
        this.time = TIME_FORMATTER.format(instant);
    }
}

export class ExistingChatMessage extends ChatMessage {
    public messageId: string;
    public clapCount: number;

    constructor({
        authorId,
        timestamp,
        content,
        type,
        isMotiMateMessage,
        messageId,
        clapCount,
    }: RawExistingMessageData) {
        super(
            authorId,
            new Date(timestamp),
            content,
            MessageType[type],
            isMotiMateMessage,
        );
        this.messageId = messageId;
        this.clapCount = clapCount;
    }
}

export class NewChatMessage extends ChatMessage {
    private timestamp: string; //NOTE: Will be needed when sending New Message to the Server for ease of use in the BE

    constructor(
        authorId: string | null,
        content: string,
        type: MessageType,
        isMotiMateMessage: boolean,
    ) {
        const INSTANT = new Date();
        super(authorId, INSTANT, content, type, isMotiMateMessage);
        this.timestamp = INSTANT.toISOString();
    }

    transformToRawChatMessage(): RawMessageData {
        return {
            ...this,
            timestamp: this.timestamp,
            type: MessageType[this.type],
        };
    }
}
