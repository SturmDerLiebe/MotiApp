import { Colors } from "@/constants/Colors";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

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
  const BASIC_BUTTON_STYLE: StyleProp<ViewStyle> = { borderRadius: 100 };
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
  fontSize: 16,
  fontWeight: 500,
  paddingVertical: 12,
  textAlign: "center",
};
