import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const BUTTON_TEXT_STYLE: StyleProp<TextStyle> = {
    color: Colors.white,
    ...Fonts.paragraph.p2,
    paddingVertical: 12,
    textAlign: "center",
};

export const BASIC_BUTTON_STYLE: StyleProp<ViewStyle> = { borderRadius: 100 };

export const BUTTON_STYLES = {
    primary: StyleSheet.create({
        inactive: { backgroundColor: Colors.blue.grey },
        active: { backgroundColor: Colors.blue.dark },
        disabled: { backgroundColor: Colors.grey.dark1 },
    }),
    secondary: StyleSheet.create({
        inactive: {
            backgroundColor: Colors.white,
            borderColor: Colors.blue.grey,
        },
        active: {
            backgroundColor: Colors.grey.light2,
            borderColor: Colors.blue.grey,
        },
        disabled: {
            backgroundColor: Colors.white,
            borderColor: Colors.grey.dark1,
        },
    }),
    danger: StyleSheet.create({
        inactive: { backgroundColor: Colors.red.medium },
        active: {
            backgroundColor: Colors.red.dark,
            borderWidth: 1,
            borderColor: Colors.red.medium,
        },
        disabled: { backgroundColor: Colors.red.light },
    }),
};
