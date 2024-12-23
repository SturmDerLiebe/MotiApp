import { PressableProps } from "react-native";

export type ButtonProps = Pick<
    PressableProps,
    "disabled" | "onPress" | "style"
> & {
    /** A Label the button should display inside of it */
    title: string;
};
