import { buildBaseHeaders, bulildRequest } from "@/utils/RequestHelpers";
import { RawExistingMessageData } from "../DTO/ChatMessage";

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
    async sendMessage(dto: RawExistingMessageData) {
        return fetch(
            bulildRequest(
                `group/message`,
                "POST",
                `message=${encodeURIComponent(dto.content)}`,
                await buildBaseHeaders(),
                dto,
            ),
        );
    }

    /**
     * @throws any `fetch()` related error
     */
    async receiveExistingMessages() {
        return fetch(
            bulildRequest(
                `group/message`,
                "GET",
                `amount=20`,
                await buildBaseHeaders(),
            ),
        );
    }

    /**
     * @throws any `fetch()` related error
     */
    async receiveNewMessages() {
        return fetch(
            bulildRequest(
                `group/message`,
                "GET",
                `amount=1`,
                await buildBaseHeaders(),
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
