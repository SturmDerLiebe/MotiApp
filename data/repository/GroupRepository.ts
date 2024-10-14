import { bulildRequest } from "@/utils/RequestHelpers";

class GroupRepository {
  /**
   * @throws any `fetch()` related error
   */
  create(groupName: string) {
    return fetch(
      bulildRequest("group", "POST", `name=${groupName}`, groupName),
    );
  }

  join(joinCode: string) {
    return fetch(bulildRequest("group", "PATCH", `code=${joinCode}`, joinCode));
  }
}

/**
 * A Singleton Instance for making Group related Requests like:
 *
 * - Group creation
 */
export default new GroupRepository();
