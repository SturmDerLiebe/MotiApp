import { ChatList } from "@/components/chat/ChatList";
import { CHAT_STYLES } from "@/components/chat/ChatStyles";
import { MessageType, NewChatMessage } from "@/data/DTO/ChatMessage";
import { useUserInfoContext } from "@/hooks/context/UserInfoContext";
import { useMessagingContext } from "@/hooks/context/message/MessagingContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import { StrictMode, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function GroupScreen() {
    const [messagingState] = useMessagingContext();

    return (
        <StrictMode>
            <View style={CHAT_STYLES.screenContainer}>
                <ChatList chatState={messagingState} />
                <ChatInput />
            </View>
        </StrictMode>
    );
}

function ChatInput() {
    const userInfo = useUserInfoContext();

    const sendNewMessage = useMessagingContext()[1];

    const [message, setMessage] = useState("");

    return (
        <TextInput
            defaultValue={message}
            onChange={(event) => setMessage(event.nativeEvent.text.trim())}
            onSubmitEditing={function handleSendingMessage() {
                if (message.length > 0) {
                    sendNewMessage(
                        new NewChatMessage(
                            userInfo instanceof UserInfoSuccess
                                ? userInfo.userId
                                : null,
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
    );
}
