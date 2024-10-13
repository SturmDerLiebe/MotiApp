import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { NullBoolean } from "@/hooks/useRegistrationValidityState";
import { Image } from "expo-image";
import { ForwardedRef, forwardRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
  type NativeSyntheticEvent,
  type TextInputEndEditingEventData,
  TextInputSubmitEditingEventData,
  Pressable,
  TextInputProps,
} from "react-native";

interface InputComponentProps extends TextInputProps {
  /**
   * The current validity of this Component's Userinput
   */
  isValid: NullBoolean;
}

interface ValidatingInputComponentProps extends InputComponentProps {
  onChangeText: (text: string) => void;
  /**
   * Callback that is called after the User's input got validated.
   * @param newIsValid - new Validity of this Input Field
   */
  onValidation: (newIsValid: boolean) => void;
  onSubmitEditing: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export function UsernameInputComponent(props: ValidatingInputComponentProps) {
  const { isValid, onValidation } = props;

  return (
    <InputComponent
      {...props}
      labelText="Username (Nickname)"
      isValid={isValid ?? true}
      hint="e.g. Jane"
      keyboardType="default"
      autoComplete="username"
      returnKeyType="next"
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^\p{L}{1,25}(?:\s\p{L}{1,25})?$/u;
        onValidation(REGEX.test(text));
      }}
      placeholder="How should we call you?"
    />
  );
}

/**
 * @field onSubmitEditing - Callback that is called when the text input's submit button is pressed.
 */
export const EmailInputComponent = forwardRef(function EmailInputComponent(
  props: ValidatingInputComponentProps,
  ref?: ForwardedRef<TextInput>,
) {
  const { isValid, onValidation } = props;

  return (
    <InputComponent
      {...props}
      labelText="E-Mail"
      isValid={isValid ?? true}
      hint="e.g. jane-doe.uk@gmail.com"
      keyboardType="email-address"
      autoComplete="email"
      returnKeyType="next"
      onEndEditing={function ({ nativeEvent: { text } }) {
        const REGEX = /^[\w\-\.]{1,63}@[\w-]{1,63}\.[\w]{2,63}$/;
        onValidation(REGEX.test(text));
      }}
      placeholder="Enter your Email"
      ref={ref}
    />
  );
});

/**
 * @field onSubmitEditing - Callback that is called when the text input's submit button is pressed.
 */
export const PasswordInputComponent = forwardRef(
  function PasswordInputComponent(
    props: ValidatingInputComponentProps,
    ref?: ForwardedRef<TextInput>,
  ) {
    const { isValid, onValidation } = props;

    return (
      <InputComponent
        {...props}
        labelText="Password"
        isValid={isValid ?? true}
        hint="must contain at least 8 characters, numbers or symbols"
        keyboardType="default"
        autoComplete="new-password"
        returnKeyType="next"
        onEndEditing={function ({ nativeEvent: { text } }) {
          const REGEX = /^[\p{L}\p{P}0-9]{8,100}$/u;
          onValidation(REGEX.test(text));
        }}
        isSecureText
        ref={ref}
      />
    );
  },
);

export const RepeatPasswordInputComponent = forwardRef(
  function RepeatPasswordInputComponent(
    props: InputComponentProps & {
      validateInput: (repeatedPassword: string) => void;
    },
    ref?: ForwardedRef<TextInput>,
  ) {
    const { isValid, validateInput } = props;

    return (
      <InputComponent
        {...props}
        labelText="Confirm Password"
        // TODO: Move ?? true to Base Component
        isValid={isValid ?? true}
        hint="This must exactly match your selected password"
        keyboardType="default"
        autoComplete="current-password"
        returnKeyType="done"
        onEndEditing={function ({ nativeEvent: { text } }) {
          validateInput(text);
        }}
        isSecureText
        ref={ref}
      />
    );
  },
);

interface BaseInputComponentProps extends InputComponentProps {
  /** The Text to be displayed above this Input Field */
  labelText: string;
  isValid: boolean;
  /** A text hint showing the User the required format of this Input Field */
  hint: string;
  keyboardType: KeyboardTypeOptions;
  autoComplete?: "email" | "username" | "current-password" | "new-password";
  onEndEditing: (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  /** If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false. */
  isSecureText?: boolean;
  placeholder?: string;
}

const LINE_PADDING_VERTICAL = 10;

export const InputComponent = forwardRef(
  //TODO: USE ...props
  function InputComponent(
    props: BaseInputComponentProps,
    ref?: ForwardedRef<TextInput>,
  ) {
    //TODO: InputComponent Should have its own validity state and only forward that to parent if needed
    const {
      labelText,
      isValid,
      hint,
      onChangeText,
      onSubmitEditing,
      onEndEditing,
      isSecureText = false,
    } = props;

    let [isEmpty, setIsEmpty] = useState(true);
    let [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
      <View>
        <Text
          style={[
            { color: Colors.grey.dark3, paddingBottom: 4 },
            Fonts.paragraph.p9,
          ]}
        >
          {labelText}
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderColor: determineBorderColor(isValid, isEmpty),
            borderRadius: 8,
            borderWidth: 1,
          }}
        >
          <TextInput
            {...props}
            secureTextEntry={isSecureText && !isPasswordShown}
            placeholderTextColor={Colors.grey.dark2}
            style={[
              {
                color: Colors.blue.grey,
                paddingHorizontal: 14,
                paddingVertical: LINE_PADDING_VERTICAL,
                flex: 6,
                ...Fonts.paragraph.p4,
              },
              isSecureText ? { paddingEnd: 0 } : null,
            ]}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={onSubmitEditing ? false : true}
            onEndEditing={(event) => {
              onEndEditing(event);
              setIsEmpty(event.nativeEvent.text.length === 0 ? true : false);
            }}
            ref={ref}
          />

          {isSecureText ? (
            <Pressable
              accessibilityLabel="Show password"
              onPress={() => {
                setIsPasswordShown(!isPasswordShown);
              }}
              style={{
                flex: 1,
                paddingVertical: LINE_PADDING_VERTICAL,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  isPasswordShown
                    ? require("@/assets/images/EyeOpenFitting.svg")
                    : require("@/assets/images/EyeHidden.svg")
                }
                contentFit="fill"
                style={{
                  height: 20,
                  aspectRatio: 1,
                }}
              />
            </Pressable>
          ) : null}
        </View>

        <Text
          style={{
            color: isValid ? Colors.grey.dark3 : "red",
            ...Fonts.paragraph.p8,
          }}
        >
          {hint}
        </Text>
      </View>
    );
  },
);

function determineBorderColor(isValid: boolean, isEmpty: boolean): string {
  if (!isValid) {
    return Colors.red;
  } else if (isEmpty) {
    return Colors.grey.dark1;
  } else {
    return Colors.grey.dark2;
  }
}
