import { Fonts } from "@/constants/Fonts";
import { ExistingChatMessage } from "@/data/DTO/ChatMessage";
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
            ItemSeparatorComponent={function () {
                return <View style={CHAT_STYLES.divider} />;
            }}
            estimatedItemSize={100}
            estimatedListSize={{ height: 592, width: 350 }}
            initialScrollIndex={mostRecentPayload.length - 1}
            onContentSizeChange={(_, height) =>
                FLASH_LIST_REF.current?.scrollToOffset({ offset: height })
            }
            getItemType={(item) => {
                return typeof item === "string" ? 100 : item.type;
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

    function determinePreviousAuthor() {
        return previousItem instanceof ExistingChatMessage
            ? previousItem.author
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
                previousAuthor={determinePreviousAuthor()}
            />
        );
    }
}
