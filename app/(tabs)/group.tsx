import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { ChatMessage, ImageMessage, TextMessage } from "@/data/ImageMessage";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";

const CHAT_STYLES = StyleSheet.create({
  chatContainer: { alignItems: "stretch" },
  messageContainer: { backgroundColor: Colors.grey.light2 },
  image: { borderRadius: 50, height: "25%" },
});

export default function GroupScreen() {
  return (
    <View>
      <FlashList
        style={CHAT_STYLES.chatContainer}
        data={SAMPLE_DATA_WITH_DATE}
        renderItem={function ({ item, index }) {
          function itemIsDateString(item: ChatDataItem): item is string {
            return typeof item === "string";
          }

          function determinePreviousAuthor() {
            let previousItem = SAMPLE_DATA_WITH_DATE[index - 1];
            return typeof previousItem == "string" ? null : previousItem.author;
          }

          if (itemIsDateString(item)) {
            return <Text>{item}</Text>;
          } else {
            return determineComponentByMessageType(
              item,
              item.author !== determinePreviousAuthor(),
            );
          }
          //TODO: Check if last two entries should display "Today" or "Yesterday""
        }}
        estimatedItemSize={100}
        estimatedListSize={{ height: 592, width: 350 }}
      />
    </View>
  );
}

export function determineComponentByMessageType(
  item: ChatMessage,
  shouldShowAuthor: boolean,
) {
  if (item instanceof TextMessage) {
    return (
      <TextMessageComponent shouldRenderAuthor={shouldShowAuthor} {...item} />
    );
  } else if (item instanceof ImageMessage) {
    return (
      <Image
        source={item.imageURL}
        contentFit="scale-down"
        style={CHAT_STYLES.image}
      />
    );
  } else {
    return null;
  }
}

export function TextMessageComponent(props: {
  text: string;
  timeString: string;
  author: string;
  shouldRenderAuthor?: boolean;
}) {
  return (
    <View style={CHAT_STYLES.messageContainer}>
      {props.shouldRenderAuthor ? (
        <Text style={Fonts.paragraph.p9}>{props.author}</Text>
      ) : null}

      <Text style={Fonts.paragraph.p4}>{props.text}</Text>

      <Text style={Fonts.date.small}>{props.timeString}</Text>
    </View>
  );
}
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
const SAMPLE_DATA = [
  new ImageMessage(
    "Jung",
    "2024-08-11T17:03:06Z",
    "https://placehold.co/140x184",
  ),
  new TextMessage(
    "Jung",
    "2024-08-11T17:03:10Z",
    "cheer for your friend @user1!",
  ),
  new TextMessage(
    "Jung",
    "2024-08-11T17:03:10Z",
    "cheer for your friend @user1!",
  ),
  new TextMessage(
    "Jung",
    "2024-08-11T17:03:10Z",
    "cheer for your friend @user1!",
  ),
  new TextMessage(
    "Jung",
    "2024-08-12T17:03:06Z",
    "cheer for your friend @user1!",
  ),
  new TextMessage(
    "Jung",
    "2024-08-12T17:03:06Z",
    "cheer for your friend @user1!",
  ),
  new TextMessage(
    "Jung",
    "2024-08-13T17:03:06Z",
    "cheer for your friend @user1!",
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

// TODO: Concat Groups and splice with date Segment
const GROUPED_SAMPLE_DATA = groupByPolyFill(SAMPLE_DATA, function (item) {
  return item.dateString;
});

type ChatDataItem = ChatMessage | string;

const SAMPLE_DATA_WITH_DATE: ChatDataItem[] = Object.entries(
  GROUPED_SAMPLE_DATA,
).reduce(function (
  accumulatingArray: ChatDataItem[],
  [currentDateString, currentMessages],
) {
  accumulatingArray.push(currentDateString, ...currentMessages);
  return accumulatingArray;
}, []);

export const TestStyles = { borderColor: "black", borderWidth: 1 };
