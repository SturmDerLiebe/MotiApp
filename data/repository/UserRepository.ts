import { typeCheckEnvVariable } from "@/utils/TypeHelpers";

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

export type DigitString = string;

type apiPaths = "registration" | "activation";

class UserRepository {
  private static API_BASE_ROUTE = "https://my.api.mockaroo.com";

  private static bulildRequest(
    route: apiPaths,
    queryParam: string,
    body: RegistrationDetails | DigitString,
  ) {
    return new Request(
      `${UserRepository.API_BASE_ROUTE}/${route}?${queryParam}`,
      {
        method: "POST",
        headers: {
          "X-API-Key": typeCheckEnvVariable(
            process.env.EXPO_PUBLIC_MOCKAROO_KEY,
            "EXPO_PUBLIC_MOCKAROO_KEY",
          ),
        },
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  registerUser(body: RegistrationDetails) {
    return fetch(
      UserRepository.bulildRequest(
        "registration",
        `randomInt=${Math.ceil(Math.random() * 4)}`,
        body,
      ),
    );
  }

  /**
   * @throws any `fetch()` related error
   */
  verifyUser(verificationCode: DigitString) {
    return fetch(
      UserRepository.bulildRequest(
        "activation",
        `code=${verificationCode}`,
        verificationCode,
      ),
    );
  }
}

/**
 * A Singleton Instance for making User related Requests like:
 *
 * - RegistrationDetails
 * - Activation
 */
export default new UserRepository();
