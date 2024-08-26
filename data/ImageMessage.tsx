import { Image } from "expo-image";
import { ReactElement } from "react";
import { Text, View } from "react-native";
import { TestStyles } from "@/app/(tabs)/";
const SAMPLE_IMAGE = require("@/assets/images/SampleImages/SampleImageMessage.png");

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
  #timestamp: Date;

  dateString: string;
  timeString: string;

  constructor(
    public author: string,
    timestamp: string,
  ) {
    this.#timestamp = new Date(timestamp);
    this.dateString = DATE_FORMATTER.format(this.#timestamp);
    this.timeString = TIME_FORMATTER.format(this.#timestamp);
  }

  // TODO: Make a React Function Component that takes children-prop out of this:
  // - Revert ChatMessage back to an interface
  // - Create object with .MessageParent and .TextMessage & .ImageMessage
  protected renderBaseMessage(body: ReactElement, includeAuthor: boolean) {
    return (
      <View style={TestStyles}>
        {includeAuthor ? <Text>{this.author}</Text> : null}
        {body}
      </View>
    );
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

  renderMessage(includeAuthor: boolean = true): ReactElement {
    return super.renderBaseMessage(<Text>{this.text}</Text>, includeAuthor);
  }
}

export class ImageMessage extends ChatMessage {
  constructor(
    author: string,
    timestamp: string,
    /**
     * Currenty Unused. Will eventually replace {@link SAMPLE_IMAGE}
     */
    public imageURL: string,
  ) {
    super(author, timestamp);
  }

  renderMessage(includeAuthor: boolean = true): ReactElement {
    return super.renderBaseMessage(
      <Image
        source={SAMPLE_IMAGE}
        contentFit="scale-down"
        style={{ width: "40%", height: 184 }}
      />,
      includeAuthor,
    );
  }
}
