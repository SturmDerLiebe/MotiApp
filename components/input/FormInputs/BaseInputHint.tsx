import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Text } from "react-native";

export function BaseInputHint({
    hint,
    isValid,
}: {
    hint: string;
    isValid: boolean;
}) {
    return (
        <Text
            style={{
                color: isValid ? MotiColors.grey.dark3 : MotiColors.red.error,
                ...Fonts.paragraph.p8,
            }}
        >
            {hint}
        </Text>
    );
}
