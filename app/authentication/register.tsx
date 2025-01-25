import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { RegistrationFormInputs } from "@/components/input/FormInputs/RegistrationFormInputs";
import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { RegistrationDetails } from "@/data/repository/UserRepository";
import useNavigateOnSuccessEffect from "@/hooks/navigation/useNavigationOnSuccessEffect";
import {
    areAnyFieldsBeingEdited,
    areAnyFieldsInvalid,
} from "@/hooks/reducer/Registration/Helper";
import {
    InitialRegistrationFormState,
    registrationFormReducer,
} from "@/hooks/reducer/Registration/RegistrationReducer";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import useRegistrationState from "@/hooks/useRegistrationState";
import { RequestLoading } from "@/utils/RequestStatus";
import { useReducer } from "react";
import { Text, View } from "react-native";

export default function RegistrationScreen() {
    useAndroidBackButtonInputHandling();

    const [registrationState, startRegistration] = useRegistrationState();

    useNavigateOnSuccessEffect(registrationState, "/authentication/verify");

    const [formState, dispatchFormState] = useReducer(
        registrationFormReducer,
        InitialRegistrationFormState,
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
                    title={
                        registrationState instanceof RequestLoading
                            ? "Loading..."
                            : "Create Account"
                    }
                    disabled={
                        areAnyFieldsInvalid(formState) ||
                        // registrationState instanceof RequestLoading ||
                        areAnyFieldsBeingEdited(formState)
                    }
                    onPress={onSubmit}
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

    function onSubmit() {
        startRegistration(
            new RegistrationDetails(
                formState.username.text,
                formState.email.text,
                formState.newPassword.text,
            ),
        );
    }
}
