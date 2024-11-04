import {
  ChatMessageDAO,
  MessageType,
} from "@/data/DataAccessObjects/ChatMessageDAO";
import { PropsWithChildren } from "react";
import { CHAT_STYLES } from "./ChatStyles";
import { Text, View } from "react-native";
import { ClapReactionButton } from "../buttons/ClapReactionButton";
import { Image } from "expo-image";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

export function MessageComponent({
  item,
  previousAuthor,
}: {
  item: ChatMessageDAO;
  previousAuthor: string | null;
}) {
  function isDifferentAuthorFromLast() {
    return previousAuthor !== item.author;
  }

  function determineComponentMatchingMessageType(item: ChatMessageDAO) {
    if (item.type === MessageType.TEXT) {
      return (
        <TextMessageComponent
          showAuthor={isDifferentAuthorFromLast()}
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
      showAuthor={isDifferentAuthorFromLast()}
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

export function ImageMessageComponent({
  imageUri,
  time: timeString,
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

export function TextMessageComponent(props: {
  text: string;
  time: string;
  author: string;
  showAuthor: boolean;
}) {
  return (
    <View style={CHAT_STYLES.bodyBase}>
      <View style={CHAT_STYLES.headerAndMainContainer}>
        <Author shouldShowAuthor={props.showAuthor} author={props.author} />

        <Text style={[Fonts.paragraph.p4]}>{props.text}</Text>
      </View>

      <Text style={[Fonts.date.small, CHAT_STYLES.time]}>{props.time}</Text>
    </View>
  );
}

export function Author(props: { shouldShowAuthor: boolean; author: string }) {
  return props.shouldShowAuthor ? (
    <Text style={Fonts.paragraph.p9}>{props.author}</Text>
  ) : null;
}

export function AvatarIcon(props: { showAuthor: boolean }) {
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
