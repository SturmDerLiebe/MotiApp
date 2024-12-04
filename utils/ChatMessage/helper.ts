import { ChatMessage, ExistingChatMessage } from "@/data/DTO/ChatMessage";
import { ChatMessageListItem } from "@/hooks/group/message/useReceiveMessages";

//TODO: Performance Improvement Idea: Do this while mapping over RawMessageData[]
export function spliceChatMessageListWithDates(
  chatMessageList: ExistingChatMessage[],
): ChatMessageListItem[] {
  const RESULT_MAP = new Map<string, ChatMessage[]>();

  for (const ELEMENT of chatMessageList) {
    if (RESULT_MAP.has(ELEMENT.date)) {
      RESULT_MAP.get(ELEMENT.date)?.push(ELEMENT);
    } else {
      RESULT_MAP.set(ELEMENT.date, [ELEMENT]);
    }
  }

  return [...RESULT_MAP].flat(2);
}
