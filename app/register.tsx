import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import {
  EmailInputComponent,
  PasswordInputComponent,
  RepeatPasswordInputComponent,
  UsernameInputComponent,
} from "@/components/InputComponents";
import { RegistrationDetails } from "@/data/repository/UserRepository";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import useRegistrationState, {
  NetworkFailure,
  RegistrationFailure,
  RegistrationLoading,
} from "@/hooks/useRegistrationState";
import useRegistrationValidityState from "@/hooks/useRegistrationValidityState";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";

export default function RegistrationScreen() {
  useAndroidBackButtonInputHandling();

  let [isBeingEdited, setIsBeingEdited] = useState(true);
  let [registrationState, startRegistration] = useRegistrationState();
  let [inputValidity, updateInputValidity] = useRegistrationValidityState();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const EMAIL_REF = useRef<TextInput>(null);
  const PASSWORD_REF = useRef<TextInput>(null);
  const REPEAT_PASSWORD_REF = useRef<TextInput>(null);

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "stretch",
          // TODO: Use percents
          paddingHorizontal: 28,
          paddingTop: 27,
          paddingBottom: 22,
        },
      ]}
    >
      <Heading5>Register</Heading5>

      {
        //#region Form Fields
      }
      <View
        style={{
          height: "55%",
          justifyContent: "space-between",
          paddingTop: 27,
        }}
      >
        <UsernameInputComponent
          isValid={inputValidity.usernameValidity}
          onChangeText={(text) => {
            setUsername(text);
            setIsBeingEdited(true);
          }}
          onSubmitEditing={() => EMAIL_REF.current?.focus()}
          onValidation={(isValid) => {
            updateInputValidity({ usernameValidity: isValid });
            setIsBeingEdited(false);
          }}
        />

        <EmailInputComponent
          isValid={inputValidity.emailValidity}
          onChangeText={(text) => {
            setEmail(text);
            setIsBeingEdited(true);
          }}
          onSubmitEditing={() => PASSWORD_REF.current?.focus()}
          onValidation={(isValid) => {
            updateInputValidity({ emailValidity: isValid });
            setIsBeingEdited(false);
          }}
          ref={EMAIL_REF}
        />

        <PasswordInputComponent
          isValid={inputValidity.passwordValidity}
          onChangeText={(text) => {
            setPassword(text);
            setIsBeingEdited(true);
          }}
          onSubmitEditing={() => REPEAT_PASSWORD_REF.current?.focus()}
          onValidation={(isValid) => {
            updateInputValidity({ passwordValidity: isValid });
            setIsBeingEdited(false);
          }}
          ref={PASSWORD_REF}
        />

        <RepeatPasswordInputComponent
          isValid={inputValidity.repeatPasswordValidity}
          validateInput={(repeatedPassword) =>
            updateInputValidity({
              repeatPasswordValidity: repeatedPassword === password,
            })
          }
          ref={REPEAT_PASSWORD_REF}
        />
      </View>
      {
        //#endregion Form Fields
      }

      <View style={{ paddingTop: 162 }}>
        <PrimaryButton
          title={
            registrationState instanceof RegistrationLoading
              ? "Loading..."
              : "Create Account"
          }
          disabled={
            inputValidity.areAnyInputsInvalid() ||
            registrationState instanceof RegistrationLoading ||
            isBeingEdited
          }
          onPress={onSubmit}
        />

        <Text
          style={{
            textAlign: "center",
            paddingTop: 16,
            color: Colors.blue.dark,
            ...Fonts.paragraph.p5,
            lineHeight: 22,
          }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>

      {registrationState instanceof RegistrationFailure ||
      registrationState instanceof NetworkFailure ? (
        <Text>{registrationState.message}</Text>
      ) : null}
    </View>
  );

  function onSubmit() {
    startRegistration(new RegistrationDetails(username, email, password));
  }
}
