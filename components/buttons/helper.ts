import { StyleProp, ViewStyle } from "react-native";
import { type BUTTON_STYLES } from "./styles";

/**
 * Picks out the Styles Object matching the current Button State
 */
export function determineButtonStyleNoBorder(
    buttonTypeStyles: (typeof BUTTON_STYLES)[keyof typeof BUTTON_STYLES],
    pressed: boolean,
    disabled: boolean,
): StyleProp<ViewStyle> {
    if (disabled) {
        return buttonTypeStyles.disabled;
    } else if (pressed) {
        return buttonTypeStyles.active;
    } else {
        return buttonTypeStyles.inactive;
    }
}
