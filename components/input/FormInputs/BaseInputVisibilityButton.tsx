import { Pressable } from "react-native";
import { LINE_PADDING_VERTICAL } from "./styles";
import { Image } from "expo-image";

export function BaseInputVisibilityButton({
    showButton,
    isInputVisible,
    onPress,
}: {
    showButton: boolean;
    isInputVisible: boolean;
    onPress: () => void;
}) {
    return showButton ? (
        <Pressable
            accessibilityLabel={
                isInputVisible ? "Hide secret input" : "Show secret input"
            }
            onPress={onPress}
            style={{
                flex: 1,
                paddingVertical: LINE_PADDING_VERTICAL,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                source={
                    isInputVisible
                        ? require("@/assets/images/EyeOpenFitting.svg")
                        : require("@/assets/images/EyeHidden.svg")
                }
                contentFit="fill"
                style={{
                    height: 20,
                    aspectRatio: 1,
                }}
            />
        </Pressable>
    ) : null;
}
