import { typeCheckEnvVariable } from "@/utils/TypeHelpers";
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

type apiPaths = "registration" | "activation" | "personal-goal";

const API_BASE_ROUTE = "https://my.api.mockaroo.com";

class UserRepository {
  /**
   * @throws any `fetch()` related error
   */
  registerUser(body: RegistrationDetails) {
    return fetch(
      bulildRequest(
        "registration",
        `randomInt=${Math.ceil(Math.random() * 4)}`,
        body,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  verifyUser(verificationCode: SafeDigits) {
    return fetch(
      bulildRequest("activation", `code=${verificationCode}`, verificationCode),
    );
  }

  updatePersonalGoal(goalPerWeek: SafeDigits) {
    return fetch(
      bulildRequest("personal-goal", `goal=${goalPerWeek}`, goalPerWeek, "PUT"),
    );
  }
}

/**
 * # Important
 *
 * **Only `import` in Tests!**
 *
 * # Summary
 *
 * Builds a Request
 */
export function bulildRequest(
  route: apiPaths,
  queryParamPair: string,
  body: RegistrationDetails | SafeDigits,
  method: "POST" | "PUT" = "POST",
) {
  return new Request(`${API_BASE_ROUTE}/${route}?${queryParamPair}`, {
    method: method,
    headers: {
      "X-API-Key": typeCheckEnvVariable(
        process.env.EXPO_PUBLIC_MOCKAROO_KEY,
        "EXPO_PUBLIC_MOCKAROO_KEY",
      ),
    },
    body: JSON.stringify(body),
  });
}

/**
 * A Singleton Instance for making User related Requests like:
 *
 * - RegistrationDetails
 * - Activation
 */
export default new UserRepository();
