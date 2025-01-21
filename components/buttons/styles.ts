import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const BASIC_BUTTON_TEXT_STYLE: StyleProp<TextStyle> = {
    color: MotiColors.white,
    ...Fonts.paragraph.p2,
    textAlign: "center",
};

export const BUTTON_TEXT_STYLE = {
    secondary: StyleSheet.create({
        enabled: { color: MotiColors.blue.grey },
        disabled: { color: MotiColors.grey.dark1 },
    }),
};

export const BASIC_BUTTON_STYLE: StyleProp<ViewStyle> = {
    borderRadius: 100,
    paddingVertical: 10.5,
    borderWidth: 1.5,
    borderColor: MotiColors.transparent,
};

export const BUTTON_STYLES = {
    primary: StyleSheet.create({
        inactive: {
            backgroundColor: MotiColors.blue.grey,
        },
        active: {
            backgroundColor: MotiColors.blue.dark,
        },
        disabled: {
            backgroundColor: MotiColors.grey.dark1,
        },
    }),
    secondary: StyleSheet.create({
        inactive: {
            backgroundColor: MotiColors.white,
            borderColor: MotiColors.blue.grey,
        },
        active: {
            backgroundColor: MotiColors.grey.light2,
            borderColor: MotiColors.blue.grey,
        },
        disabled: {
            backgroundColor: MotiColors.white,
            borderColor: MotiColors.grey.dark1,
        },
    }),
    danger: StyleSheet.create({
        inactive: {
            backgroundColor: MotiColors.red.medium,
        },
        active: {
            backgroundColor: MotiColors.red.dark,
            borderColor: MotiColors.red.medium,
        },
        disabled: {
            backgroundColor: MotiColors.red.light,
        },
    }),
};
