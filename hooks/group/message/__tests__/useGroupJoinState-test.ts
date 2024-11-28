import {
  ChatMessageDAO,
  MessageType,
} from "@/data/DataAccessObjects/ChatMessageDAO";
import { spliceChatMessageListWithDates } from "@/utils/ChatMessage/helper";

test("spliceChatMessageListWithDates - returns correct flattened List", () => {
  //GIVEN
  const TODAY_MESSAGE = new ChatMessageDAO(
    "12345",
    "DummyAuthor",
    "2024-11-28T00:00:00Z",
    "Lorem Ipsum",
    MessageType.TEXT,
  );
  const TOMORROW_MESSAGE = new ChatMessageDAO(
    "4321",
    "DummyAuthor",
    "2024-11-29T00:00:00Z",
    "imgage.url",
    MessageType.IMAGE,
  );

  const SAMPLE_DATA = [
    TODAY_MESSAGE,
    TODAY_MESSAGE,
    TOMORROW_MESSAGE,
    TOMORROW_MESSAGE,
  ];

  //WHEN
  const ACTUAL = spliceChatMessageListWithDates(SAMPLE_DATA);

  //THEN
  expect(ACTUAL).toHaveLength(6);
  expect(typeof ACTUAL[0]).toBe("string");
  expect(ACTUAL[2]).toEqual(TODAY_MESSAGE);
  expect(typeof ACTUAL[3]).toBe("string");
  expect(ACTUAL[5]).toEqual(TOMORROW_MESSAGE);
});
