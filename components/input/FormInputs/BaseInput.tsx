import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { forwardRef } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { LINE_PADDING_VERTICAL } from "./styles";

export const BaseInput = forwardRef<TextInput, TextInputProps>(
    function BaseInput(props, ref) {
        return (
            <TextInput
                {...props}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                placeholderTextColor={MotiColors.grey.dark2}
                style={[
                    Fonts.paragraph.p4,
                    {
                        color: MotiColors.blue.grey,
                        paddingVertical: LINE_PADDING_VERTICAL,
                        paddingHorizontal: 14,
                        flex: 6,
                    },
                    props.secureTextEntry ? { paddingEnd: 0 } : null,
                    props.style,
                ]}
                ref={ref}
            />
        );
    },
);
