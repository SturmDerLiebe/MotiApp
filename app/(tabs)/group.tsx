import { CHAT_STYLES } from "@/components/chat/ChatStyles";
import { MessageComponent } from "@/components/chat/MesssageComponent";
import { Fonts } from "@/constants/Fonts";
import {
  ChatMessageDAO,
  ImageMessageDAO,
  TextMessageDAO,
} from "@/data/ChatMessageDAO";
import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";

export default function GroupScreen() {
  return (
    <View style={CHAT_STYLES.screenContainer}>
      <FlashList
        data={SAMPLE_DATA_WITH_DATE}
        renderItem={ChatItem}
        ItemSeparatorComponent={function () {
          return <View style={CHAT_STYLES.divider} />;
        }}
        estimatedItemSize={100}
        estimatedListSize={{ height: 592, width: 350 }}
      />
    </View>
  );
}

function ChatItem({ item, index }: { item: ChatDataItem; index: number }) {
  //TODO: Check if last two entries should display "Today" or "Yesterday""
  function itemIsDateString(item: ChatDataItem): item is string {
    return typeof item === "string";
  }

  function determinePreviousAuthor() {
    let previousItem = SAMPLE_DATA_WITH_DATE[index - 1];
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

// --------------------

const SAMPLE_DATA = [
  new ImageMessageDAO(
    "Jung",
    "2024-08-11T17:03:06Z",
    "https://placehold.co/140x184",
  ),
  new TextMessageDAO(
    "Jung",
    "2024-08-11T17:03:10Z",
    "cheer for your friend @user1!",
  ),
  new TextMessageDAO(
    "Jung",
    "2024-08-11T17:03:10Z",
    "We have a result from the last week’s challenge.\n@user1 and @user5 unfortunately didn’t meet the goal!\n\nPlease pay 10€ for the group fund.\nCurrent balance: 40€",
  ),
  new TextMessageDAO(
    "Jung",
    "2024-08-12T17:03:06Z",
    "cheer for your friend @user1!",
  ),
  new TextMessageDAO(
    "Jung",
    "2024-08-12T17:03:06Z",
    "cheer for your friend @user1!",
  ),
  new TextMessageDAO(
    "Jung",
    "2024-08-13T17:03:06Z",
    "cheer for your friend @user1!",
  ),
  new ImageMessageDAO(
    "Jung",
    "2024-08-11T17:03:06Z",
    "https://placehold.co/140x184",
  ),
];

function groupByPolyFill<ItemType, Key extends string | symbol>(
  arr: ItemType[],
  callback: (currentElement: ItemType, index: number) => Key,
): Record<Key, ItemType[]> {
  return arr.reduce(
    (acc: Record<Key, ItemType[]>, currentElement: ItemType, index: number) => {
      const key = callback(currentElement, index);
      acc[key] ??= [];
      acc[key].push(currentElement);
      return acc;
    },
    {} as Record<Key, ItemType[]>,
  );
}

// TODO: Concat Groups and splice with date Segment?
const GROUPED_SAMPLE_DATA = groupByPolyFill(SAMPLE_DATA, function (item) {
  return item.dateString;
});

type ChatDataItem = ChatMessageDAO | string;

const SAMPLE_DATA_WITH_DATE: ChatDataItem[] = Object.entries(
  GROUPED_SAMPLE_DATA,
).reduce(function (
  accumulatingArray: ChatDataItem[],
  [currentDateString, currentMessages],
) {
  accumulatingArray.push(currentDateString, ...currentMessages);
  return accumulatingArray;
}, []);
