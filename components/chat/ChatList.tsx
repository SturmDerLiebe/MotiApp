import { Fonts } from "@/constants/Fonts";
import { ChatMessage } from "@/data/DTO/ChatMessage";
import { ChatMessageListItem } from "@/hooks/context/message/MessagingContext";
import { SocketStatus } from "@/utils/socket/status";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { Text, View } from "react-native";
import { CHAT_STYLES } from "./ChatStyles";
import { MessageComponent } from "./MesssageComponent";

export function ChatList({
    chatState: { mostRecentPayload },
}: {
    chatState: SocketStatus;
}) {
    const FLASH_LIST_REF = useRef<FlashList<ChatMessageListItem>>(null);

    const CAN_AUTO_SCROLL = useRef(true); // TODO: #3

    return (
        <FlashList
            ref={FLASH_LIST_REF}
            data={mostRecentPayload}
            renderItem={({ item, index }) => (
                <ChatItem
                    item={item}
                    previousItem={mostRecentPayload[index - 1]}
                />
            )}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={32} // NOTE: Be careful when changing this, since a wrong number will screw the initial render completely.
            initialScrollIndex={mostRecentPayload.length - 1}
            estimatedFirstItemOffset={0}
            ItemSeparatorComponent={function () {
                return <View style={CHAT_STYLES.divider} />;
            }}
            estimatedListSize={{ height: 592, width: 350 }}
            getItemType={(item) => {
                return typeof item === "string"
                    ? 100
                    : (item as ChatMessage).type;
            }}
            onContentSizeChange={() => {
                if (CAN_AUTO_SCROLL.current) {
                    FLASH_LIST_REF.current?.scrollToEnd({ animated: true });
                }
            }}
            onScrollBeginDrag={() => {
                CAN_AUTO_SCROLL.current = false;
            }}
            onScrollEndDrag={() => {
                CAN_AUTO_SCROLL.current = true;
            }}
        />
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

    function determinePreviousAuthorId() {
        return previousItem instanceof ChatMessage
            ? previousItem.authorId
            : null;
    }

    if (itemIsDateString(item)) {
        function DateDivider({ date }: { date: string }) {
            return (
                <Text style={[Fonts.paragraph.p9, CHAT_STYLES.date]}>
                    {date}
                </Text>
            );
        }

        return <DateDivider date={item} />;
    } else {
        return (
            <MessageComponent
                item={item}
                previousAuthorId={determinePreviousAuthorId()}
            />
        );
    }
}
