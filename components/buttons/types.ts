import { Icons } from "@/constants/Icons";
import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";

export type ButtonProps = Pick<PressableProps, "onPress"> & {
    /** A Label the button should display inside of it */
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: keyof typeof Icons;
};
