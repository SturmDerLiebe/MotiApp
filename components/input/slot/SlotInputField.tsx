import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useState } from "react";
import {
    ColorValue,
    DimensionValue,
    FlexAlignType,
    KeyboardTypeOptions,
    TextInput,
} from "react-native";

export function SlotInputField(props: {
    keyboardType: KeyboardTypeOptions;
    slotAmount: number;
    width: DimensionValue;
    paddingStart: DimensionValue;
    letterSpacing: number;
    fontStyle: keyof typeof Fonts.digits;
    failurePredicate: () => boolean;
    onChange: (text: string) => void;
    alignSelf?: "auto" | FlexAlignType;
}) {
    const [INPUT, SET_INPUT] = useState("");

    const {
        slotAmount,
        width,
        paddingStart,
        letterSpacing,
        fontStyle,
        alignSelf,
        failurePredicate,
    } = props;

    return (
        <TextInput
            {...props}
            defaultValue={INPUT}
            selectionColor="#80808000" //TODO: Use Colors.transparent
            placeholder={"0".repeat(slotAmount)}
            maxLength={slotAmount}
            style={[
                {
                    width,
                    color: determineFontColor(failurePredicate),
                    letterSpacing,
                    alignSelf,
                    paddingStart,
                },
                Fonts.digits[fontStyle],
            ]}
            onChange={({ nativeEvent: { text } }) => {
                SET_INPUT(text);
                props.onChange(text);
            }}
        />
    );

    function determineFontColor(failurePredicate: () => boolean): ColorValue {
        if (failurePredicate()) {
            return MotiColors.red.error;
        } else {
            return MotiColors.blue.grey;
        }
    }
}
