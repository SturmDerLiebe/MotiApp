import { typeCheckEnvVariable } from "@/utils/TypeHelpers";

/**
 * A Data Transfer Object containing details about a new user to be registered
 */
class RegistrationDetails {
  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}
}

class UserRepository {
  private static API_BASE_ROUTE = "https://my.api.mockaroo.com";
  private static REGISTRATION_PATH = "registration";

  /**
   * @throws any `fetch()` related error
   */
  registerUser(body: RegistrationDetails) {
    return fetch(
      `https://my.api.mockaroo.com/registration?randomInt=${Math.ceil(Math.random() * 4)}`,
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
}

/**
 * A Singleton Instance for making User related Requests like:
 *
 * - RegistrationDetails
 * - Login
 */
export default new UserRepository();
export { RegistrationDetails };
