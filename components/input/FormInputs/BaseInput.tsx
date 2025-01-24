import type { SetRefType } from "@/components/types/ComponentProps";
import { MotiColors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { LINE_PADDING_VERTICAL } from "./styles";
import { Fonts } from "@/constants/Fonts";

export function BaseInput(
    props: TextInputProps & {
        setRef: SetRefType<TextInput>;
    },
) {
    const { setRef } = props;
    const INPUT_REF = useRef<null | TextInput>(null);

    useEffect(() => {
        setRef(INPUT_REF);
    }, [setRef]);

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
            ref={INPUT_REF}
        />
    );
}
