import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { RegistrationFormInputs } from "@/components/input/FormInputs/RegistrationFormInputs";
import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useNavigateOnSuccessEffectNew } from "@/hooks/navigation/useNavigationOnSuccessEffect";
import {
    areAnyFieldsBeingEdited,
    areAnyFieldsInvalid,
    transformRegistrationFormStateToDTO,
} from "@/hooks/reducer/Registration/Helper";
import {
    InitialRegistrationFormState,
    registrationFormReducer,
} from "@/hooks/reducer/Registration/RegistrationReducer";
import type { RegistrationFormState } from "@/hooks/reducer/Registration/Types";
import { useActionStatePolyfill } from "@/hooks/useActionState";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { UserRepositoryInstance } from "@/new_data";
import { useReducer } from "react";
import { Text, View } from "react-native";

export default function RegistrationScreen() {
    useAndroidBackButtonInputHandling();

    const [formState, dispatchFormState] = useReducer(
        registrationFormReducer,
        InitialRegistrationFormState,
    );

    const [registrationActionState, registrationAction, isPending] =
        useActionStatePolyfill(
            (_previousState: unknown, payload: RegistrationFormState) => {
                // TODO: #2
                return UserRepositoryInstance.registerUser(
                    transformRegistrationFormStateToDTO(payload),
                );
            },
            null,
        );

    useNavigateOnSuccessEffectNew(
        Boolean(registrationActionState?.ok),
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
                    onPress={() => registrationAction(formState)}
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

            {/* {registrationState instanceof RegistrationFailure || */}
            {/* registrationState instanceof NetworkError ? ( */}
            {/*     <Text>{registrationState.message}</Text> */}
            {/* ) : null} */}
        </View>
    );
}
