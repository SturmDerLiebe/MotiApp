import { bulildRequest } from "@/utils/RequestHelpers";
import { MessageDTO } from "../DataTransferObjects/MessageDTO";

class GroupRepository {
  /**
   * @throws any `fetch()` related error
   */
  create(groupName: string) {
    return fetch(
      bulildRequest("group", "POST", `name=${groupName}`, groupName),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  join(joinCode: string) {
    return fetch(bulildRequest("group", "PATCH", `code=${joinCode}`, joinCode));
  }

  /**
   * @throws any `fetch()` related error
   */
  sendMessage(dto: MessageDTO) {
    return fetch(
      bulildRequest(
        `group/${dto.groupId}/message`,
        "POST",
        `message=${dto.content}`,
        dto,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  receiveExistingMessages(groupId: string) {
    return fetch(
      bulildRequest(
        `group/${groupId}/message`,
        "POST",
        `groupId=${groupId}&amount=20`,
        groupId,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  receiveNewMessages(groupId: string) {
    return fetch(
      bulildRequest(
        `group/${groupId}/message`,
        "POST",
        `groupId=${groupId}&amount=1`,
        groupId,
      ),
    );
  }
}

/**
 * A Singleton Instance for making Group related Requests like:
 *
 * - Group creation
 */
export default new GroupRepository();
