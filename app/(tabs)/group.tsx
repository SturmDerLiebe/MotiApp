import { ChatList } from "@/components/chat/ChatList";
import { CHAT_STYLES } from "@/components/chat/ChatStyles";
import { MessageType, NewChatMessage } from "@/data/DTO/ChatMessage";
import useMessagingState from "@/hooks/group/message/useMessaging";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function GroupScreen() {
    const TEXT_INPUT_REF = useRef<TextInput>(null);

    const { messagingState, startMessaging, cancelMessaging, sendNewMessage } =
        useMessagingState();

    useEffect(() => {
        startMessaging();
        return cancelMessaging;
    }, [startMessaging, cancelMessaging]);

    const [message, setMessage] = useState("");

    return (
        <View style={CHAT_STYLES.screenContainer}>
            <ChatList chatState={messagingState} />
            <TextInput
                ref={TEXT_INPUT_REF}
                defaultValue={message}
                onChange={(event) => setMessage(event.nativeEvent.text)}
                onSubmitEditing={function sendMessage() {
                    sendNewMessage(
                        new NewChatMessage(message, MessageType.TEXT),
                    );
                    TEXT_INPUT_REF.current?.clear();
                }}
                returnKeyType="send"
                style={{ borderWidth: StyleSheet.hairlineWidth }}
            />
        </View>
    );
}
