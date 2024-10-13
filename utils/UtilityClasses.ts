import { FormatError } from "./CustomErrors";

export type SafeDigits = `${number}`;

/**
 * @throws {FormatError} on {@link safeDigits} having non numeric characters
 */
export class DigitString {
  safeDigits: SafeDigits;

  constructor(unsafeDigits: string) {
    if (/^\d+$/.test(unsafeDigits)) {
      this.safeDigits = unsafeDigits as SafeDigits; //TODO: Use Type Narrowing instead [NT-22](https://www.notion.so/Use-TypeNarrowing-in-DigitString-class-f9ea869770674e2f9771a7bfdf62bbd6?pvs=4)
    } else {
      throw new FormatError(
        `The supplied string "${unsafeDigits}" contains non numeric digits!`,
      );
    }
  }
}
