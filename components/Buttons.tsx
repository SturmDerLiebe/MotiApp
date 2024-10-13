import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

const BASIC_BUTTON_STYLE: StyleProp<ViewStyle> = { borderRadius: 100 };

export function PrimaryButton({
  title,
  disabled,
  onPress,
  style,
}: PressableProps & {
  /** A Label the button shoud display inside of it */
  title: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      disabled={disabled}
      style={determineButtonStyleByState}
      onPress={onPress}
    >
      <Text style={BUTTON_TEXT_STYLE}>{title}</Text>
    </Pressable>
  );

  function determineButtonStyleByState({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    let bgColor: string;
    if (disabled) {
      bgColor = Colors.grey.dark1;
    } else if (pressed) {
      bgColor = Colors.blue.dark;
    } else {
      bgColor = Colors.blue.grey;
    }
    return [
      BASIC_BUTTON_STYLE,
      {
        backgroundColor: bgColor,
      },
      style,
    ];
  }
}

const BUTTON_TEXT_STYLE: StyleProp<TextStyle> = {
  color: Colors.white,
  ...Fonts.paragraph.p2,
  paddingVertical: 12,
  textAlign: "center",
};

export function SecondaryButton(
  props: PressableProps & {
    /** A Label the button shoud display inside of it */
    title: string;
    style?: StyleProp<ViewStyle>;
  },
) {
  const { disabled, title, style } = props;

  return (
    <Pressable {...props} style={determineButtonStyleByState}>
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

  function determineButtonStyleByState({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    let backgroundColor: string, borderColor: string;

    if (disabled) {
      backgroundColor = Colors.white;
      borderColor = Colors.grey.dark1;
    } else if (pressed) {
      backgroundColor = Colors.grey.light2;
      borderColor = Colors.blue.grey;
    } else {
      backgroundColor = Colors.white;
      borderColor = Colors.blue.grey;
    }
    return [
      BASIC_BUTTON_STYLE,
      {
        backgroundColor,
        borderColor,
        borderWidth: 1.5,
      },
      style,
    ];
  }
}
