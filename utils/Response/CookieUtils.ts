import * as setCookie from "set-cookie-parser";

/**
 * Reads the cookie value from the `Set-Cookie` Header {@link cookieName} on {@link response}
 */
export function readCookie(
    response: Response,
    cookieName: string,
): string | undefined {
    // Typecasting to Cookie | undefined, since source typing is not extensive enough
    const COOKIE = setCookie.parse(response.headers.getSetCookie(), {
        map: true,
    })[cookieName] as setCookie.Cookie | undefined;
    return COOKIE?.value;
}
