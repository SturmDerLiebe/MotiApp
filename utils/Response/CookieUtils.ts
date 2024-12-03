import * as setCookie from "set-cookie-parser";

/**
 * Reads the cookie value from the `Set-Cookie` Header {@link cookieName} on {@link response}
 */
export function readCookie(response: Response, cookieName: string): string {
  return setCookie.parse(response.headers.getSetCookie(), { map: true })[
    cookieName
  ].value;
}
