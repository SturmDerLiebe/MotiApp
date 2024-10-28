import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { ChatMessage, ImageMessage, TextMessage } from "@/data/ImageMessage";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";

const MESSAGE_BORDER_RADIUS = 13;
const CHAT_STYLES = StyleSheet.create({
  screenContainer: {
    alignSelf: "center",
    width: "90%",
    height: "93%",
  },
  messageContainer: {
    backgroundColor: Colors.grey.light2,
    borderRadius: MESSAGE_BORDER_RADIUS,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  messageText: { maxWidth: "80%" },
  generalTimeText: {
    color: Colors.grey.dark3,
    alignSelf: "flex-end",
  },
  image: {
    borderRadius: MESSAGE_BORDER_RADIUS,
    width: 140,
    height: 184,
    alignSelf: "flex-start",
  },
  divider: { height: 12 },
});

export default function GroupScreen() {
  function renderItem({ item, index }: { item: ChatDataItem; index: number }) {
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
  }

  return (
    <View style={CHAT_STYLES.screenContainer}>
      <FlashList
        data={SAMPLE_DATA_WITH_DATE}
        renderItem={renderItem}
        ItemSeparatorComponent={function () {
          return <View style={CHAT_STYLES.divider} />;
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
    console.debug(item.imageURL);
    return (
      <Image
        source={{ uri: item.imageURL }}
        contentFit="cover"
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

      <Text style={[Fonts.paragraph.p4, CHAT_STYLES.messageText]}>
        {props.text}
      </Text>

      <Text style={[Fonts.date.small, CHAT_STYLES.generalTimeText]}>
        {props.timeString}
      </Text>
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
    "We have a result from the last week’s challenge.\n@user1 and @user5 unfortunately didn’t meet the goal!\n\nPlease pay 10€ for the group fund.\nCurrent balance: 40€",
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
  new ImageMessage(
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
