import { PressableProps, StyleProp, ViewStyle } from "react-native";

export type ButtonProps = Pick<PressableProps, "disabled" | "onPress"> & {
    /** A Label the button should display inside of it */
    title: string;
    style?: StyleProp<ViewStyle>;
};
