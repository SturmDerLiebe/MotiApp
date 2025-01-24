import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Text } from "react-native";

export function BaseInputLabel({ label }: { label: string }) {
    return (
        <Text
            style={[
                { color: MotiColors.grey.dark3, paddingBottom: 4 },
                Fonts.paragraph.p9,
            ]}
        >
            {label}
        </Text>
    );
}
