import { PropsWithChildren } from "react";
import { CHAT_STYLES } from "./ChatStyles";
import { Text, View } from "react-native";
import { ClapReactionButton } from "../buttons/ClapReactionButton";
import { Image } from "expo-image";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import {
  ChatMessage,
  ExistingChatMessage,
  MessageType,
} from "@/data/DTO/ChatMessage";

export function MessageComponent({
  item,
  previousAuthor,
}: {
  item: ChatMessage;
  previousAuthor: string | null;
}) {
  function shouldShowAuthor() {
    return (
      item instanceof ExistingChatMessage && previousAuthor !== item.author
    );
  }

  function determineComponentMatchingMessageType(item: ChatMessage) {
    if (item.type === MessageType.TEXT) {
      return (
        <TextMessageComponent
          showAuthor={shouldShowAuthor()}
          text={item.content}
          {...item}
        />
      );
    } else if (item.type === MessageType.IMAGE) {
      return <ImageMessageComponent imageUri={item.content} {...item} />;
    } else {
      return null;
    }
  }

  return (
    <ChatItemWrapper
      showAuthor={shouldShowAuthor()}
      clapCount={
        1
        // TODO: should be item.clapCount
      }
    >
      {determineComponentMatchingMessageType(item)}
    </ChatItemWrapper>
  );
}

export function ChatItemWrapper({
  showAuthor,
  clapCount = 0,
  children,
}: PropsWithChildren<{
  showAuthor: boolean;
  clapCount: number;
}>) {
  return (
    <View style={CHAT_STYLES.messageContainer}>
      <AvatarIcon showAuthor={showAuthor} />

      <View style={{ width: "2.5%" }} />

      {children}

      <View style={CHAT_STYLES.clapReactionContainer}>
        <ClapReactionButton initialCount={0} />
      </View>
    </View>
  );
}

function ImageMessageComponent({
  imageUri,
  time: string,
}: {
  imageUri: string;
  time: string;
}) {
  return (
    <Image
      source={{ uri: imageUri }}
      contentFit="cover"
      style={CHAT_STYLES.image}
    />
  );
}

function TextMessageComponent(props: {
  text: string;
  time: string;
  author?: string;
  showAuthor: boolean;
}) {
  return (
    <View style={CHAT_STYLES.bodyBase}>
      <View style={CHAT_STYLES.headerAndMainContainer}>
        <Author
          shouldShowAuthor={props.showAuthor && props.author !== undefined}
          author={props.author ?? ""}
        />

        <Text style={[Fonts.paragraph.p4]}>{props.text}</Text>
      </View>

      <Text style={[Fonts.date.small, CHAT_STYLES.time]}>{props.time}</Text>
    </View>
  );
}

function Author(props: { shouldShowAuthor: boolean; author: string }) {
  return props.shouldShowAuthor ? (
    <Text style={Fonts.paragraph.p9}>{props.author}</Text>
  ) : null;
}

function AvatarIcon(props: { showAuthor: boolean }) {
  return props.showAuthor ? (
    <Image
      tintColor={Colors.orange.dark}
      source="https://placehold.co/30"
      style={CHAT_STYLES.avatar}
    />
  ) : (
    <View style={CHAT_STYLES.avatar} />
  );
}
