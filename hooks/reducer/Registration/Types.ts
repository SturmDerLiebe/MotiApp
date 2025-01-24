interface TextFieldState {
    text: string;
    isValid: boolean | null;
    isBeingEdited: boolean;
}

/**
 * Needs to be `type` so it can be used with {@link Object.values}
 */
export type RegistrationFormState = {
    username: TextFieldState;
    email: TextFieldState;
    newPassword: TextFieldState;
    repeatedPassword: TextFieldState;
};

export type RegistrationFormAction =
    | { type: "UsernameEdit"; payload: string }
    | { type: "UsernameValidate"; payload: boolean }
    | { type: "EmailEdit"; payload: string }
    | { type: "EmailValidate"; payload: boolean }
    | { type: "NewPasswordEdit"; payload: string }
    | { type: "NewPasswordValidate"; payload: boolean }
    | { type: "RepeatedPasswordEdit"; payload: string }
    | { type: "RepeatedPasswordValidate"; payload: boolean };
