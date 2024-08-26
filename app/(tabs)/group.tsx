import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import { ChatMessage, ImageMessage, TextMessage } from "@/data/ImageMessage";

export default function IndexScreen() {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingStart: 12,
        },
        TestStyles,
      ]}
    >
      <FlashList
        data={DATED_SAMPLE_DATA}
        renderItem={function ({ item, index }) {
          if (typeof item == "string") {
            // TODO: Treat first item always being a date

            return <Text>{item}</Text>;
          } else {
            let previousItem = DATED_SAMPLE_DATA[index - 1];
            let previousAuthor =
              typeof previousItem == "string" ? null : previousItem.author;
            let currentAuthor = item.author;

            return item.renderMessage(currentAuthor !== previousAuthor);
          }
          //TODO: Check if last two entries should display "Today" or "Yesterday""
        }}
        estimatedItemSize={100}
        estimatedListSize={{ height: 592, width: 350 }}
      />
    </View>
  );
}

const SAMPLE_DATA = [
  new ImageMessage(
    "Jung",
    "2024-08-11T17:03:06Z",
    "../../assets/images/SampleImages/SampleImageMessage.png",
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

function groupByPolyFill<T>(
  arr: T[],
  callback: (currentElement: T, index: number) => string | symbol,
) {
  return arr.reduce(
    (
      acc: Record<string | symbol, T[]> = {},
      currentElement: T,
      index: number,
    ) => {
      const key = callback(currentElement, index);
      acc[key] ??= [];
      acc[key].push(currentElement);
      return acc;
    },
    {},
  );
}

// TODO: Concat Groups and splice with date Segment
const GROUPED_SAMPLE_DATA = groupByPolyFill(SAMPLE_DATA, function (item) {
  return item.dateString;
}) as Record<string, (ImageMessage | TextMessage)[]>; // NOTE: groupBy returns Partial even though all groups are required in this case

const DATED_SAMPLE_DATA = Object.entries(GROUPED_SAMPLE_DATA).reduce(function (
  accumulatingArray: (ImageMessage | TextMessage | string)[],
  [currentDateString, currentMessages],
) {
  accumulatingArray.push(currentDateString, ...currentMessages);
  return accumulatingArray;
}, []);
export const TestStyles = { borderColor: "black", borderWidth: 1 };
