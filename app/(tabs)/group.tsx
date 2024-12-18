import { ChatList } from "@/components/chat/ChatList";
import { CHAT_STYLES } from "@/components/chat/ChatStyles";
import { MessageType, NewChatMessage } from "@/data/DTO/ChatMessage";
import { useMessagingContext } from "@/hooks/context/message/MessagingContext";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function GroupScreen() {
    const [messagingState, sendNewMessage] = useMessagingContext();

    const [message, setMessage] = useState("");

    return (
        <View style={CHAT_STYLES.screenContainer}>
            <ChatList chatState={messagingState} />
            <TextInput
                defaultValue={message}
                onChange={(event) => setMessage(event.nativeEvent.text.trim())}
                onSubmitEditing={function sendMessage() {
                    if (message.length > 0) {
                        sendNewMessage(
                            new NewChatMessage(
                                message,
                                MessageType.TEXT,
                                false,
                            ),
                        );
                        setMessage("");
                    }
                }}
                returnKeyType="send"
                style={{ borderWidth: StyleSheet.hairlineWidth }}
            />
        </View>
    );
}
