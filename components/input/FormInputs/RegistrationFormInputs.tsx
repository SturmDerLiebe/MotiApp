import { EmailInputComponent } from "@/components/input/FormInputs/EmailInputComponent";
import { NewPasswordInputComponent } from "@/components/input/FormInputs/NewPasswordInputComponent";
import { RepeatedPasswordInputComponent } from "@/components/input/FormInputs/RepeatedPasswordInputComponent";
import { UsernameInputComponent } from "@/components/input/FormInputs/UsernameInputComponent";
import type {
    RegistrationFormAction,
    RegistrationFormState,
} from "@/hooks/reducer/Registration/Types";
import { useRef } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function RegistrationFormInputs({
    formState,
    dispatchFormState,
}: {
    formState: RegistrationFormState;
    dispatchFormState: React.Dispatch<RegistrationFormAction>;
}) {
    const FORM_FIELD_REFS = {
        email: useRef<TextInput>(null),
        newPassword: useRef<TextInput>(null),
        repeatedPassword: useRef<TextInput>(null),
    };

    return (
        <View
            style={{
                height: "55%",
                justifyContent: "space-between",
                paddingTop: 27,
            }}
        >
            <UsernameInputComponent
                isValid={formState.username.isValid}
                dispatchRegistrationFormAction={dispatchFormState}
                focusNext={() => FORM_FIELD_REFS.email.current?.focus()}
            />

            <EmailInputComponent
                isValid={formState.email.isValid}
                dispatchRegistrationFormAction={dispatchFormState}
                focusNext={() => FORM_FIELD_REFS.newPassword.current?.focus()}
                ref={FORM_FIELD_REFS.email}
            />

            <NewPasswordInputComponent
                isValid={formState.newPassword.isValid}
                dispatchRegistrationFormAction={dispatchFormState}
                focusNext={() =>
                    FORM_FIELD_REFS.repeatedPassword.current?.focus()
                }
                ref={FORM_FIELD_REFS.newPassword}
            />

            <RepeatedPasswordInputComponent
                matchingPassword={formState.newPassword.text}
                isValid={formState.repeatedPassword.isValid}
                dispatchRegistrationFormAction={dispatchFormState}
                ref={FORM_FIELD_REFS.newPassword}
            />
        </View>
    );
}
