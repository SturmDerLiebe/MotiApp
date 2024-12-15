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
    author: string;
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
    time: string;
    date: string;

    constructor(
        instant: Date,
        /**
         * Text or remote/local Image Uri
         */
        public content: string,
        public type: MessageType,
        public isMotiMateMessage: boolean,
    ) {
        this.date = DATE_FORMATTER.format(instant);
        this.time = TIME_FORMATTER.format(instant);
    }
}

export class ExistingChatMessage extends ChatMessage {
    public messageId: string;
    public author: string;
    public clapCount: number;

    constructor(rawMessage: RawExistingMessageData) {
        super(
            new Date(rawMessage.timestamp),
            rawMessage.content,
            MessageType[rawMessage.type],
            rawMessage.isMotiMateMessage,
        );
        this.messageId = rawMessage.messageId;
        this.author = rawMessage.author;
        this.clapCount = rawMessage.clapCount;
    }
}

export class NewChatMessage extends ChatMessage {
    private timestamp: string; //NOTE: Will be needed when sending New Message to the Server for ease of use in the BE

    constructor(
        content: string,
        type: MessageType,
        isMotiMateMessage: boolean,
    ) {
        const INSTANT = new Date();
        super(INSTANT, content, type, isMotiMateMessage);
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
