import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Keyboard, type TextInputProps } from "react-native";

/**
 * An open Input on Android can get closed via the Backbutton or Swipe.
 *
 * This hook handles this by clearing all focus, so {@link TextInputProps}`.onEndEditing()` can fire properly
 */
export default function useAndroidBackButtonInputHandling(): void {
  useEffect(() => {
    const KEYBOARD_CLOSE = Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });

    return () => {
      KEYBOARD_CLOSE.remove();
    };
  }, []);
}
