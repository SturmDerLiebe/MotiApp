import type { IconName } from "@/constants/Icons";
import type {
    PressableProps,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";
import type { BUTTON_STYLES } from "./styles";

export type ButtonProps = Pick<PressableProps, "onPress"> & {
    /** A Label the button should display inside of it */
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: IconName;
    small?: boolean;
};

export type PublicButtonProps = Omit<BaseButtonProps, "type">;

export type TitleOnlyButtonProps = Pick<PressableProps, "onPress"> & {
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    small?: boolean;
};

export type IconOnlyButtonProps = Pick<PressableProps, "onPress"> & {
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    iconData: IconData;
    small?: boolean;
};

export type IconAndTitleButtonProps = Pick<PressableProps, "onPress"> & {
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconData: Omit<IconData, "ariaLabel">;
    small?: boolean;
};

export type BaseButtonProps = Pick<PressableProps, "onPress"> & {
    type: keyof typeof BUTTON_STYLES;
    title?: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconData?: IconData;
    small?: boolean;
};

type IconData = {
    name: IconName;
    size: number;
    ariaLabel?: string;
};
