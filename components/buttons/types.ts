import { Icons } from "@/constants/Icons";
import { PressableProps, StyleProp, ViewStyle } from "react-native";

export type ButtonProps = Pick<PressableProps, "onPress"> & {
    /** A Label the button should display inside of it */
    title: string;
    disabled: boolean;
    style?: StyleProp<ViewStyle>;
    icon?: keyof typeof Icons;
};
