import { buildBaseHeaders, bulildRequest } from "@/utils/RequestHelpers";
import { MessageDTO } from "../DataTransferObjects/MessageDTO";

class GroupRepository {
  /**
   * @throws any `fetch()` related error
   */
  async create(groupName: string) {
    return fetch(
      bulildRequest(
        "group",
        "POST",
        `name=${groupName}`,
        await buildBaseHeaders(),
        groupName,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  async join(joinCode: string) {
    return fetch(
      bulildRequest(
        "group",
        "PATCH",
        `code=${joinCode}`,
        await buildBaseHeaders(),
        joinCode,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  async sendMessage(dto: MessageDTO) {
    return fetch(
      bulildRequest(
        `group/${dto.groupId}/message`,
        "POST",
        `message=${dto.content}`,
        await buildBaseHeaders(),
        dto,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  async receiveExistingMessages(groupId: string) {
    return fetch(
      bulildRequest(
        `group/${groupId}/message`,
        "POST",
        `groupId=${groupId}&amount=20`,
        await buildBaseHeaders(),
        groupId,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  async receiveNewMessages(groupId: string) {
    return fetch(
      bulildRequest(
        `group/${groupId}/message`,
        "POST",
        `groupId=${groupId}&amount=1`,
        await buildBaseHeaders(),
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
