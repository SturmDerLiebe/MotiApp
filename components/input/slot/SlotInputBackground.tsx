import { MotiColors } from "@/constants/Colors";
import { renderTimes } from "@/utils/componentHelpers";
import React from "react";
import { View, ViewStyle } from "react-native";

export function SlotInputBackground(props: {
    slotAmount: number;
    successPredicate: () => boolean;
    failurePredicate: () => boolean;
    columnGap?: number;
    zIndex?: number;
}) {
    const { zIndex = -1, columnGap = 12 } = props;
    return (
        <View
            accessible={false}
            style={[
                {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap,
                    position: "absolute",
                    zIndex,
                },
            ]}
        >
            {renderTimes(props.slotAmount, (key: number) => (
                <DigitCellBackground key={key} {...props} />
            ))}
        </View>
    );

    function DigitCellBackground(props: {
        key: number;
        successPredicate: () => boolean;
        failurePredicate: () => boolean;
    }) {
        const { successPredicate, failurePredicate } = props;
        return (
            <View
                style={[
                    {
                        flex: 1,
                        aspectRatio: 1,
                        borderRadius: 8,
                    },
                    determineBorderStyles(successPredicate, failurePredicate),
                ]}
                {...props}
            />
        );

        function determineBorderStyles(
            successPredicate: () => boolean,
            failurePredicate: () => boolean,
        ): ViewStyle {
            if (successPredicate()) {
                return { borderColor: MotiColors.green, borderWidth: 2 };
            } else if (failurePredicate()) {
                return { borderColor: MotiColors.red.error, borderWidth: 2 };
            } else {
                return { borderColor: MotiColors.grey.dark1, borderWidth: 1 };
            }
        }
    }
}
