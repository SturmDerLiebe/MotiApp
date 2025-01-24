import type { SetRefType } from "@/components/types/ComponentProps";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";
import { BaseInput } from "./BaseInput";
import { BaseInputContainer } from "./BaseInputContainer";
import { BaseInputHint } from "./BaseInputHint";
import { BaseInputLabel } from "./BaseInputLabel";
import { BaseInputVisibilityButton } from "./BaseInputVisibilityButton";

export function BaseInputComponent(
    props: TextInputProps & {
        label: string;
        hint: string;
        isValid: boolean;
        setRef: SetRefType<TextInput>;
    },
) {
    let [isEmpty, setEmpty] = useState(true);
    let [isSecureTextEntry, setSecureTextEntry] = useState(
        () => props.secureTextEntry,
    );

    return (
        <View>
            <BaseInputLabel label={props.label} />
            <BaseInputContainer isValid={props.isValid} isEmpty={isEmpty}>
                <BaseInput
                    {...props}
                    secureTextEntry={isSecureTextEntry}
                    onEndEditing={(event) => {
                        props.onEndEditing?.(event);
                        setEmpty(event.nativeEvent.text.length === 0);
                    }}
                />

                <BaseInputVisibilityButton
                    isInputVisible={!isSecureTextEntry}
                    onPress={() => {
                        setSecureTextEntry((currentState) => !currentState);
                    }}
                />

                <BaseInputHint {...props} />
            </BaseInputContainer>
        </View>
    );
}
