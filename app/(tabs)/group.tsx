import { ChatList } from "@/components/chat/ChatList";
import { CHAT_STYLES } from "@/components/chat/ChatStyles";
import { MessageType, NewChatMessage } from "@/data/DTO/ChatMessage";
import useReceiveMessageState from "@/hooks/group/message/useReceiveMessages";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

export default function GroupScreen() {
  const [
    socketState,
    startReceivingMessages,
    stopReceivingMessages,
    sendNewMessage,
  ] = useReceiveMessageState();

  useEffect(() => {
    startReceivingMessages();
    return stopReceivingMessages();
  }, [startReceivingMessages, stopReceivingMessages]);

  const [message, setMessage] = useState("");

  return (
    <View style={CHAT_STYLES.screenContainer}>
      <ChatList chatState={socketState} />
      <TextInput
        defaultValue={message}
        onChange={(event) => setMessage(event.nativeEvent.text)}
        onSubmitEditing={function sendMessage() {
          sendNewMessage(new NewChatMessage(message, MessageType.TEXT));
        }}
        returnKeyType="send"
      />
    </View>
  );
}
