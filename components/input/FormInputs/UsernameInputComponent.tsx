import { TextInput } from "react-native-gesture-handler";
import { BaseInputComponent } from "./BaseInputComponent";
import { forwardRef } from "react";
import type { RegistrationFormAction } from "@/hooks/reducer/Registration/Types";

export const UsernameInputComponent = forwardRef<
    TextInput,
    {
        isValid: boolean | null;
        dispatchRegistrationFormAction: React.Dispatch<RegistrationFormAction>;
        focusNext: () => void;
    }
>(function UsernameInputComponent(
    { isValid, dispatchRegistrationFormAction, focusNext },
    ref,
) {
    return (
        <BaseInputComponent
            label="Username (Nickname)"
            isValid={isValid ?? true}
            hint="e.g. Jane"
            keyboardType="default"
            autoComplete="username"
            returnKeyType="next"
            placeholder="How should we call you?"
            submitBehavior="submit"
            onChangeText={(newInput) =>
                dispatchRegistrationFormAction({
                    type: "UsernameEdit",
                    payload: newInput,
                })
            }
            onSubmitEditing={focusNext}
            onEndEditing={function ({ nativeEvent: { text } }) {
                const REGEX = /^\p{L}{1,25}(?:\s\p{L}{1,25})?$/u;
                dispatchRegistrationFormAction({
                    type: "UsernameValidate",
                    payload: REGEX.test(text),
                });
            }}
            ref={ref}
        />
    );
});
