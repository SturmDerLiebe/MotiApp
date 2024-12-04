import { buildBaseHeaders, bulildRequest } from "@/utils/RequestHelpers";
import { readCookie } from "@/utils/Response/CookieUtils";
import { SafeDigits } from "@/utils/UtilityClasses";
import * as SecureStore from "expo-secure-store";

const SECURE_STORE_KEY = { sessionId: "sessionId" };

/**
 * A Data Transfer Object containing details about a new user to be registered
 */
export class RegistrationDetails {
  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}
}

class UserRepository {
  /**
   * Sends a request to register the new user with {@link RegistrationDetails} and handles saving the sessionID from the Responses Cookie
   * @throws any `fetch()` related error
   * @throws any {@link SecureStore} related Error
   */
  async registerUser(body: RegistrationDetails) {
    const RESPONSE = await fetch(
      bulildRequest(
        "registration",
        "POST",
        `randomInt=${body.username}`,
        await buildBaseHeaders(),
        body,
      ),
    );

    this.saveSessionId(readCookie(RESPONSE, "sessionId"));
    return RESPONSE;
  }

  /**
   * @throws any `fetch()` related error
   * @throws any {@link SecureStore} related Error
   */
  async verifyUser(verificationCode: SafeDigits) {
    return fetch(
      bulildRequest(
        "activation",
        "POST",
        `code=${verificationCode}`,
        await buildBaseHeaders(),
        verificationCode,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   * @throws any {@link SecureStore} related Error
   */
  async updatePersonalGoal(goalPerWeek: SafeDigits) {
    return fetch(
      bulildRequest(
        "personal-goal",
        "PUT",
        `goal=${goalPerWeek}`,
        await buildBaseHeaders(),
        goalPerWeek,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   * @throws any {@link SecureStore} related Error
   */
  async getUserInfo(sessionID: string) {
    return fetch(
      bulildRequest(
        "user-info",
        "GET",
        `sessionID=${sessionID}`,
        await buildBaseHeaders(),
      ),
    );
  }

  /**
   * @throws any {@link SecureStore} related Error
   */
  private saveSessionId(sessionId: string) {
    return SecureStore.setItemAsync(SECURE_STORE_KEY.sessionId, sessionId);
  }

  /**
   * @throws any {@link SecureStore} related Error
   */
  public findSessionId() {
    return SecureStore.getItemAsync(SECURE_STORE_KEY.sessionId);
  }
}

/**
 * A Singleton Instance for making User related Requests like:
 *
 * - Registration
 * - Activation
 */
export default new UserRepository();
