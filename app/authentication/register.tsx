import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { RegistrationFormInputs } from "@/components/input/FormInputs/RegistrationFormInputs";
import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { registrationAction } from "@/hooks/Actions/RegistrationAction";
import { useNavigateOnSuccessEffectNew } from "@/hooks/navigation/useNavigationOnSuccessEffect";
import {
    areAnyFieldsBeingEdited,
    areAnyFieldsInvalid,
} from "@/hooks/reducer/Registration/Helper";
import {
    InitialRegistrationFormState,
    registrationFormReducer,
} from "@/hooks/reducer/Registration/RegistrationReducer";
import { useActionStatePolyfill } from "@/hooks/useActionState";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { useReducer } from "react";
import { Text, View } from "react-native";

export default function RegistrationScreen() {
    useAndroidBackButtonInputHandling();

    const [formState, dispatchFormState] = useReducer(
        registrationFormReducer,
        InitialRegistrationFormState,
    );

    const [registration, registrationFormAction, isPending] =
        useActionStatePolyfill(registrationAction, null); // TODO: #2

    useNavigateOnSuccessEffectNew(
        Boolean(registration?.ok),
        "/authentication/verify",
    );

    return (
        <View
            style={[
                {
                    flex: 1,
                    alignItems: "stretch",
                    paddingHorizontal: 28, // TODO: #1
                    paddingTop: 27,
                    paddingBottom: 22,
                },
            ]}
        >
            <Heading5>Register</Heading5>

            <RegistrationFormInputs
                formState={formState}
                dispatchFormState={dispatchFormState}
            />

            <View style={{ paddingTop: 162 }}>
                <PrimaryButton
                    title={isPending ? "Loading..." : "Create Account"}
                    disabled={
                        areAnyFieldsInvalid(formState) ||
                        areAnyFieldsBeingEdited(formState) ||
                        isPending
                    }
                    onPress={() => registrationFormAction(formState)}
                />

                <Text
                    style={{
                        textAlign: "center",
                        paddingTop: 16,
                        color: MotiColors.blue.dark,
                        ...Fonts.paragraph.p5,
                        lineHeight: 22,
                    }}
                >
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy.
                </Text>
            </View>
        </View>
    );
}
