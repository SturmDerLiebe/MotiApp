import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BASIC_BUTTON_STYLE, BUTTON_STYLES } from "./styles";

/**
 * Picks out the Styles Object matching the current Button State
 */
function determineButtonStyleNoBorder(
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

/**
 * Merges Basic and extra Styles with the Style derived from the Button State i.e. `pressed` and `disabled`
 */
export function mergeButtonStyles(
    individualStyles: (typeof BUTTON_STYLES)[keyof typeof BUTTON_STYLES],
    {
        pressed,
        disabled,
        small,
    }: { pressed: boolean; disabled: boolean; small: boolean },
    extraStyles: StyleProp<ViewStyle>,
): StyleProp<ViewStyle> {
    return StyleSheet.flatten([
        BASIC_BUTTON_STYLE,
        determineButtonStyleNoBorder(individualStyles, pressed, disabled),
        small ? { paddingVertical: 8 } : null,
        extraStyles,
    ]);
}
