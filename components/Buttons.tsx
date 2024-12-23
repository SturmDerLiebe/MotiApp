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

export function PrimaryButton({
    title,
    disabled,
    onPress,
    style,
}: ButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return mergeButtonStyles(
                    BUTTON_STYLES.primary,
                    { pressed, disabled: disabled ?? false },
                    style,
                );
            }}
            onPress={onPress}
        >
            <Text style={BUTTON_TEXT_STYLE}>{title}</Text>
        </Pressable>
    );
}

export function SecondaryButton({
    disabled,
    title,
    style,
    onPress,
}: PressableProps & {
    /** A Label the button shoud display inside of it */
    title: string;
    style?: StyleProp<ViewStyle>;
}) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return StyleSheet.compose(
                    mergeButtonStyles(
                        BUTTON_STYLES.secondary,
                        { pressed, disabled: disabled ?? false },
                        style,
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
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

export function DangerButton({ title, disabled, onPress, style }: ButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => {
                return mergeButtonStyles(
                    BUTTON_STYLES.danger,
                    {
                        pressed,
                        disabled: disabled ?? false,
                    },
                    style,
                );
            }}
            onPress={onPress}
        >
            <Text style={BUTTON_TEXT_STYLE}>{title}</Text>
        </Pressable>
    );
}
