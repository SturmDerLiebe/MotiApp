import { TextInput } from "react-native-gesture-handler";
import { BaseInputComponent } from "./BaseInputComponent";
import { forwardRef } from "react";
import type { RegistrationFormAction } from "@/hooks/reducer/Registration/Types";

export const RepeatedPasswordInputComponent = forwardRef<
    TextInput,
    {
        matchingPassword: string;
        isValid: boolean | null;
        dispatchRegistrationFormAction: React.Dispatch<RegistrationFormAction>;
    }
>(function RepeatedPasswordInputComponent(
    { matchingPassword, isValid, dispatchRegistrationFormAction },
    ref,
) {
    return (
        <BaseInputComponent
            secureTextEntry
            label="Confirm Password"
            isValid={isValid ?? true}
            hint="This must exactly match your selected password"
            keyboardType="default"
            autoComplete="current-password"
            returnKeyType="done"
            placeholder="••••••••"
            onChangeText={(newInput) =>
                dispatchRegistrationFormAction({
                    type: "RepeatedPasswordEdit",
                    payload: newInput,
                })
            }
            onEndEditing={function ({ nativeEvent: { text } }) {
                dispatchRegistrationFormAction({
                    type: "RepeatedPasswordValidate",
                    payload: matchingPassword === text,
                });
            }}
            ref={ref}
        />
    );
});
