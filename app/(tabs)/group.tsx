import { CHAT_STYLES } from "@/components/chat/ChatStyles";
import { MessageComponent } from "@/components/chat/MesssageComponent";
import { Fonts } from "@/constants/Fonts";
import useReceiveMessageState, {
  ChatMessageListItem,
} from "@/hooks/group/message/useReceiveMessages";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function GroupScreen() {
  const [SOCKET_STATE, startReceivingMessages, stopReceivingMessages] =
    useReceiveMessageState();

  useEffect(() => {
    startReceivingMessages("12345"); // TODO: Save and Retreive GroupIdt:
    return stopReceivingMessages();
  }, [startReceivingMessages, stopReceivingMessages]);

  return (
    <View style={CHAT_STYLES.screenContainer}>
      <FlashList
        data={SOCKET_STATE.mostRecentPayload}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            previousItem={SOCKET_STATE.mostRecentPayload[index - 1]}
          />
        )}
        ItemSeparatorComponent={function () {
          return <View style={CHAT_STYLES.divider} />;
        }}
        estimatedItemSize={100}
        estimatedListSize={{ height: 592, width: 350 }}
      />
    </View>
  );
}

function ChatItem({
  item,
  previousItem,
}: {
  item: ChatMessageListItem;
  previousItem: ChatMessageListItem;
}) {
  //TODO: Check if last two entries should display "Today" or "Yesterday""
  function itemIsDateString(item: ChatMessageListItem): item is string {
    return typeof item === "string";
  }

  function determinePreviousAuthor() {
    return typeof previousItem == "string" ? null : previousItem.author;
  }

  if (itemIsDateString(item)) {
    function DateDivider({ date }: { date: string }) {
      return <Text style={[Fonts.paragraph.p9, CHAT_STYLES.date]}>{date}</Text>;
    }

    return <DateDivider date={item} />;
  } else {
    return (
      <MessageComponent
        item={item}
        previousAuthor={determinePreviousAuthor()}
      />
    );
  }
}
