import { Colors } from "@/constants/Colors";
import {
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle,
} from "react-native";
import { mergeButtonStyles } from "./buttons/helper";
import { BUTTON_STYLES, BUTTON_TEXT_STYLE } from "./buttons/styles";
import type { ButtonProps } from "./buttons/types";
import { Icon } from "@/constants/Icons";

export function PrimaryButton({
    title,
    disabled = false,
    onPress,
    buttonStyle,
    textStyle,
}: ButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return mergeButtonStyles(
                    BUTTON_STYLES.primary,
                    { pressed, disabled: disabled ?? false },
                    buttonStyle,
                );
            }}
            onPress={onPress}
        >
            <Text style={[BUTTON_TEXT_STYLE, textStyle]}>{title}</Text>
        </Pressable>
    );
}

export function SecondaryButton({
    disabled = false,
    title,
    buttonStyle,
    textStyle,
    onPress,
}: ButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return StyleSheet.compose(
                    mergeButtonStyles(
                        BUTTON_STYLES.secondary,
                        { pressed, disabled: disabled ?? false },
                        buttonStyle,
                    ),
                    { borderWidth: 1.5 },
                );
            }}
            onPress={onPress}
        >
            <Text
                style={[
                    BUTTON_TEXT_STYLE,
                    { color: disabled ? Colors.grey.dark1 : Colors.blue.grey },
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

export function DangerButton({
    title,
    disabled = false,
    onPress,
    buttonStyle,
    textStyle,
    icon,
}: ButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return StyleSheet.compose(
                    mergeButtonStyles(
                        BUTTON_STYLES.danger,
                        {
                            pressed,
                            disabled: disabled ?? false,
                        },
                        buttonStyle,
                    ),
                    icon !== undefined
                        ? {
                              flexDirection: "row",
                              gap: 8,
                              justifyContent: "center",
                          }
                        : null,
                );
            }}
            onPress={onPress}
        >
            {icon !== undefined ? (
                <Icon icon={icon} tintColor={Colors.white} size={20} />
            ) : null}

            <Text style={[BUTTON_TEXT_STYLE, textStyle]}>{title}</Text>
        </Pressable>
    );
}
