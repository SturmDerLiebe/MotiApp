import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

export function Heading5({ style, children }: PropsWithChildren<TextProps>) {
    return (
        <Text
            style={[
                {
                    color: MotiColors.blue.dark,
                    textAlign: "center",
                },
                Fonts.title.h5,
                ,
                style,
            ]}
        >
            {children}
        </Text>
    );
}
