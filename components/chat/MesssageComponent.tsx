import { PropsWithChildren } from "react";
import { CHAT_STYLES, TIME_STYLES } from "./ChatStyles";
import { StyleProp, Text, View } from "react-native";
import { ClapReactionButton } from "../buttons/ClapReactionButton";
import { Image, ImageStyle } from "expo-image";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import {
    ChatMessage,
    ExistingChatMessage,
    MessageType,
    NewChatMessage,
} from "@/data/DTO/ChatMessage";
import { SvgAssets } from "@/constants/SvgAssets";
import { MockIcons } from "@/constants/Icons";

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
    function isOwnMessage() {
        return item instanceof NewChatMessage && !item.isMotiMateMessage;
    }

    return (
        <View
            style={
                !isOwnMessage()
                    ? CHAT_STYLES.messageContainer
                    : { flexDirection: "row-reverse" }
            }
        >
            <AvatarIcon
                // TODO:
                // imageUri={findImageUriByAuthorId(id)}
                imageUri={Colors.orange.dark}
                showAvatar={showAuthor || item instanceof NewChatMessage}
                isMotiMateMessage={item.isMotiMateMessage}
            />
            <ChatBubbleTipContainingSpacer
                type={item.type}
                isOwnMessage={isOwnMessage()}
            />

            {children}

            {item instanceof ExistingChatMessage && item.isMotiMateMessage ? (
                <View style={CHAT_STYLES.clapReactionContainer}>
                    <ClapReactionButton initialCount={item.clapCount} />
                </View>
            ) : null}
        </View>
    );
}

function ChatBubbleTipContainingSpacer({
    type,
    isOwnMessage,
}: {
    type: MessageType;
    isOwnMessage: boolean;
}) {
    /**
     * Represents the direction the Tip of the Chat Bubble should point to.
     * ```
     * -1 == left
     *  1 == right
     * ```
     */
    const TIP_ALIGNMENT = isOwnMessage ? -1 : 1;
    return (
        <View
            style={{
                width: "2.5%",
                justifyContent: "flex-end",
                alignItems: isOwnMessage ? "flex-start" : "flex-end",
            }}
        >
            {type === MessageType.TEXT ? (
                <Image
                    tintColor={CHAT_STYLES.bodyBase.backgroundColor}
                    source={SvgAssets.ChatBubbleTipLeft}
                    style={[
                        CHAT_STYLES.chatBubbleTip,
                        {
                            transform: [
                                { scaleX: TIP_ALIGNMENT },
                                //NOTE: After scaleX is Mirrored via TIP_ALIGNMENT, translateX does not need to be inverted anymore!
                                { translateX: 12 },
                            ],
                        },
                    ]}
                />
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

function AvatarIcon({
    imageUri,
    showAvatar,
    isMotiMateMessage,
}: {
    imageUri: string;
    showAvatar: boolean;
    isMotiMateMessage: boolean;
}) {
    //NOTE: As long as the FE is using a mock server, the imageUri is just a Hexcolor code to render a circle with the specified color.
    return showAvatar ? (
        <AvatarImage
            imageUri={isMotiMateMessage ? Colors.eggplant.dark : imageUri}
            diameter={30}
            style={CHAT_STYLES.avatar}
        />
    ) : (
        <View style={CHAT_STYLES.avatar} />
    );
}

export function AvatarImage({
    imageUri,
    diameter,
    style,
}: {
    imageUri: string;
    diameter: number;
    style?: StyleProp<ImageStyle>;
}) {
    return (
        <Image
            tintColor={imageUri}
            source={MockIcons.Circle}
            style={[
                { width: diameter, aspectRatio: 1, borderRadius: diameter / 2 },
                style,
            ]}
        />
    );
}
