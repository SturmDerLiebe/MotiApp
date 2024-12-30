import { Fonts } from "@/constants/Fonts";
import { PropsWithChildren } from "react";
import { Text } from "react-native";

export function Paragraph3({ children }: PropsWithChildren) {
    return <Text style={Fonts.paragraph.p3}>{children}</Text>;
}
