import { TextInput } from "react-native-gesture-handler";
import { BaseInputComponent } from "./BaseInputComponent";
import { forwardRef } from "react";
import type { RegistrationFormAction } from "@/hooks/reducer/Registration/Types";

export const EmailInputComponent = forwardRef<
    TextInput,
    {
        isValid: boolean | null;
        dispatchRegistrationFormAction: React.Dispatch<RegistrationFormAction>;
        focusNext: () => void;
    }
>(function EmailInputComponent(
    { isValid, dispatchRegistrationFormAction, focusNext },
    ref,
) {
    return (
        <BaseInputComponent
            label="E-Mail"
            isValid={isValid ?? true}
            hint="e.g. jane-doe.uk@gmail.com"
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
            placeholder="Enter your Email"
            submitBehavior="submit"
            onChangeText={(newInput) =>
                dispatchRegistrationFormAction({
                    type: "EmailEdit",
                    payload: newInput,
                })
            }
            onSubmitEditing={focusNext}
            onEndEditing={function ({ nativeEvent: { text } }) {
                const REGEX = /^[\w\-\.]{1,63}@[\w-]{1,63}\.[\w]{2,63}$/;
                dispatchRegistrationFormAction({
                    type: "EmailValidate",
                    payload: REGEX.test(text),
                });
            }}
            ref={ref}
        />
    );
});
