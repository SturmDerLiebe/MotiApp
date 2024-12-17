import { PropsWithChildren } from "react";
import { CHAT_STYLES, TIME_STYLES } from "./ChatStyles";
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
            item.isMotiMateMessage ||
            (item instanceof ExistingChatMessage &&
                previousAuthor !== item.author)
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
        <ChatItemWrapper showAuthor={shouldShowAuthor()} item={item}>
            {determineComponentMatchingMessageType(item)}
        </ChatItemWrapper>
    );
}

export function ChatItemWrapper({
    showAuthor,
    item,
    children,
}: PropsWithChildren<{
    showAuthor: boolean;
    item: ChatMessage;
}>) {
    return (
        <View style={CHAT_STYLES.messageContainer}>
            <AvatarIcon
                showAuthor={showAuthor}
                isMotiMateMessage={item.isMotiMateMessage}
            />

            <View style={{ width: "2.5%" }} />

            {children}

            {item instanceof ExistingChatMessage && item.isMotiMateMessage ? (
                <View style={CHAT_STYLES.clapReactionContainer}>
                    <ClapReactionButton initialCount={item.clapCount} />
                </View>
            ) : null}
        </View>
    );
}

function ImageMessageComponent({
    imageUri,
    time,
}: {
    imageUri: string;
    time: string;
}) {
    return (
        <View>
            <Image
                source={{ uri: imageUri }}
                contentFit="cover"
                style={CHAT_STYLES.image}
            />
            <TimeTag time={time} type={MessageType.IMAGE} />
        </View>
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
                    shouldShowAuthor={
                        props.showAuthor && props.author !== undefined
                    }
                    author={props.author ?? ""}
                />

                <Text style={[Fonts.paragraph.p4]}>{props.text}</Text>
            </View>

            <TimeTag time={props.time} type={MessageType.TEXT} />
        </View>
    );
}

function TimeTag({ time, type }: { time: string; type: MessageType }) {
    return (
        <Text
            style={[
                Fonts.date.small,
                TIME_STYLES.timeGeneral,
                type === MessageType.TEXT
                    ? TIME_STYLES.timeText
                    : TIME_STYLES.timeImage,
            ]}
        >
            {time}
        </Text>
    );
}

function Author(props: { shouldShowAuthor: boolean; author: string }) {
    return props.shouldShowAuthor ? (
        <Text style={Fonts.paragraph.p9}>{props.author}</Text>
    ) : null;
}

function AvatarIcon(props: {
    showAuthor: boolean;
    isMotiMateMessage: boolean;
}) {
    return props.showAuthor ? (
        <Image
            tintColor={
                props.isMotiMateMessage
                    ? Colors.eggplant.dark
                    : Colors.orange.dark
            }
            source="https://placehold.co/30"
            style={CHAT_STYLES.avatar}
        />
    ) : (
        <View style={CHAT_STYLES.avatar} />
    );
}
