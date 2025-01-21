import { MotiColors } from "@/constants/Colors";
import { Icon } from "@/constants/Icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { mergeButtonStyles } from "./buttons/helper";
import {
    BASIC_BUTTON_TEXT_STYLE,
    BUTTON_STYLES,
    BUTTON_TEXT_STYLE,
} from "./buttons/styles";
import type {
    BaseButtonProps,
    IconAndTitleButtonProps,
    IconOnlyButtonProps,
    PublicButtonProps,
    TitleOnlyButtonProps,
} from "./buttons/types";

/**
 * A Button with a title.
 */
export function PrimaryButton(props: TitleOnlyButtonProps): React.JSX.Element;
/**
 * A Button with just an Icon and *no* title.
 */
export function PrimaryButton(props: IconOnlyButtonProps): React.JSX.Element;
/**
 * A Button with *both* a title and an icon.
 */
export function PrimaryButton(
    props: IconAndTitleButtonProps,
): React.JSX.Element;
export function PrimaryButton(props: PublicButtonProps) {
    return <BaseButton type="primary" {...props} />;
}

/**
 * A Button with a title.
 */
export function SecondaryButton(props: TitleOnlyButtonProps): React.JSX.Element;
/**
 * A Button with just an Icon and *no* title.
 */
export function SecondaryButton(props: IconOnlyButtonProps): React.JSX.Element;
/**
 * A Button with *both* a title and an icon.
 */
export function SecondaryButton(
    props: IconAndTitleButtonProps,
): React.JSX.Element;
export function SecondaryButton(props: PublicButtonProps) {
    return (
        <BaseButton
            type="secondary"
            {...props}
            textStyle={
                props.disabled
                    ? BUTTON_TEXT_STYLE.secondary.disabled
                    : BUTTON_TEXT_STYLE.secondary.enabled
            }
        />
    );
}

/**
 * A Button with a title.
 */
export function DangerButton(props: TitleOnlyButtonProps): React.JSX.Element;
/**
 * A Button with just an Icon and *no* title.
 */
export function DangerButton(props: IconOnlyButtonProps): React.JSX.Element;
/**
 * A Button with *both* a title and an icon.
 */
export function DangerButton(props: IconAndTitleButtonProps): React.JSX.Element;
export function DangerButton(props: PublicButtonProps) {
    return <BaseButton type="danger" {...props} />;
}

function BaseButton({
    type,
    title,
    disabled = false,
    buttonStyle,
    textStyle,
    iconData,
    onPress,
}: BaseButtonProps): React.JSX.Element {
    const TITLE_EXISTS = title !== undefined;
    const ICON_DATA_EXISTS = iconData !== undefined;

    return (
        <Pressable
            aria-label={iconData?.ariaLabel}
            disabled={disabled}
            style={({ pressed }) => {
                return StyleSheet.compose(
                    mergeButtonStyles(
                        BUTTON_STYLES[type],
                        {
                            pressed,
                            disabled: disabled,
                        },
                        buttonStyle,
                    ),
                    ICON_DATA_EXISTS && TITLE_EXISTS
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
            {ICON_DATA_EXISTS ? (
                <Icon
                    icon={iconData.name}
                    tintColor={MotiColors.white}
                    size={iconData.size}
                />
            ) : null}

            {TITLE_EXISTS ? (
                <Text style={[BASIC_BUTTON_TEXT_STYLE, textStyle]}>
                    {title}
                </Text>
            ) : null}
        </Pressable>
    );
}
