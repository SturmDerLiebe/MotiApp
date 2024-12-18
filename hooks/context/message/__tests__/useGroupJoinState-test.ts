import { ExistingChatMessage } from "@/data/DTO/ChatMessage";
import { spliceChatMessageListWithDates } from "@/utils/ChatMessage/helper";

test("spliceChatMessageListWithDates - returns correct flattened List", () => {
    //GIVEN
    const TODAY_MESSAGE = new ExistingChatMessage({
        messageId: "12345",
        author: "DummyAuthor",
        timestamp: "2024-11-28T00:00:00Z",
        content: "Lorem Ipsum",
        type: "TEXT",
    });

    const TOMORROW_MESSAGE = new ExistingChatMessage({
        messageId: "4321",
        author: "DummyAuthor",
        timestamp: "2024-11-29T00:00:00Z",
        content: "imgage.url",
        type: "IMAGE",
    });

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
