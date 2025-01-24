import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { determineInputBorderColor } from "./helper";

export function BaseInputContainer({
    isValid,
    isEmpty,
    children,
}: PropsWithChildren<{
    isValid: boolean;
    isEmpty: boolean;
}>) {
    return (
        <View
            style={{
                flexDirection: "row",
                borderColor: determineInputBorderColor(isValid, isEmpty),
                borderRadius: 8,
                borderWidth: 1,
            }}
        >
            {children}
        </View>
    );
}
