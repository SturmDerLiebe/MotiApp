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
};

export type PublicButtonProps = Omit<BaseButtonProps, "type">;

export type TitleOnlyButtonProps = Pick<PressableProps, "onPress"> & {
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export type IconOnlyButtonProps = Pick<PressableProps, "onPress"> & {
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    iconData: IconData;
};

export type IconAndTitleButtonProps = Pick<PressableProps, "onPress"> & {
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconData: Omit<IconData, "ariaLabel">;
};

export type BaseButtonProps = Pick<PressableProps, "onPress"> & {
    type: keyof typeof BUTTON_STYLES;
    title?: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconData?: IconData;
};

type IconData = {
    name: IconName;
    size: number;
    ariaLabel?: string;
};
