import { bulildRequest } from "@/utils/RequestHelpers";
import { SafeDigits } from "@/utils/UtilityClasses";

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
   * @throws any `fetch()` related error
   */
  registerUser(body: RegistrationDetails) {
    return fetch(
      bulildRequest("registration", "POST", `randomInt=${body.username}`, body),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  verifyUser(verificationCode: SafeDigits) {
    return fetch(
      bulildRequest(
        "activation",
        "POST",
        `code=${verificationCode}`,
        verificationCode,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  updatePersonalGoal(goalPerWeek: SafeDigits) {
    return fetch(
      bulildRequest("personal-goal", "PUT", `goal=${goalPerWeek}`, goalPerWeek),
    );
  }

  getUserInfo(sessionID: string) {
    return fetch(bulildRequest("user-info", "GET", `sessionID=${sessionID}`));
  }
}

/**
 * A Singleton Instance for making User related Requests like:
 *
 * - Registration
 * - Activation
 */
export default new UserRepository();
