import { TextInput } from "react-native-gesture-handler";
import { BaseInputComponent } from "./BaseInputComponent";
import { forwardRef } from "react";
import type { RegistrationFormAction } from "@/hooks/reducer/registrationReducer";

export const NewPasswordInputComponent = forwardRef<
    TextInput,
    {
        isValid: boolean | null;
        dispatchRegistrationFormAction: React.Dispatch<RegistrationFormAction>;
        focusNext: () => void;
    }
>(function NewPasswordInputComponent(
    { isValid, dispatchRegistrationFormAction, focusNext },
    ref,
) {
    return (
        <BaseInputComponent
            secureTextEntry
            label="Password"
            isValid={isValid ?? true}
            hint="must contain at least 8 characters, numbers or symbols"
            keyboardType="default"
            autoComplete="new-password"
            returnKeyType="next"
            placeholder="••••••••"
            onChangeText={(newInput) =>
                dispatchRegistrationFormAction({
                    type: "NewPasswordEdit",
                    payload: newInput,
                })
            }
            onSubmitEditing={focusNext}
            onEndEditing={function ({ nativeEvent: { text } }) {
                const REGEX = /^[\p{L}\p{P}\p{S}0-9]{8,100}$/u;
                dispatchRegistrationFormAction({
                    type: "NewPasswordValidate",
                    payload: REGEX.test(text),
                });
            }}
            ref={ref}
        />
    );
});
