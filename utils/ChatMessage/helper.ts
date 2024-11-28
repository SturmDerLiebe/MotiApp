import { ChatMessageDAO } from "@/data/DataAccessObjects/ChatMessageDAO";
import { ChatMessageListItem } from "@/hooks/group/message/useReceiveMessages";

export function spliceChatMessageListWithDates(
  chatMessageList: ChatMessageDAO[],
): ChatMessageListItem[] {
  const RESULT_MAP = new Map<string, ChatMessageDAO[]>();

  for (const ELEMENT of chatMessageList) {
    if (RESULT_MAP.has(ELEMENT.date)) {
      RESULT_MAP.get(ELEMENT.date)?.push(ELEMENT);
    } else {
      RESULT_MAP.set(ELEMENT.date, [ELEMENT]);
    }
  }

  return [...RESULT_MAP].flat(2);
}
