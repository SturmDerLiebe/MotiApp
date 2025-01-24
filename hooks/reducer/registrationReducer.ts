interface TextFieldState {
    text: string;
    isValid: boolean | null;
    isBeingEdited: boolean;
}

interface RegistrationFormState {
    username: TextFieldState;
    email: TextFieldState;
    newPassword: TextFieldState;
    repeatedPassword: TextFieldState;
}

type RegistrationFormAction =
    | { type: "UsernameEdit"; payload: string }
    | { type: "UsernameValidate"; payload: boolean }
    | { type: "EmailEdit"; payload: string }
    | { type: "EmailValidate"; payload: boolean }
    | { type: "NewPasswordEdit"; payload: string }
    | { type: "NewPasswordValidate"; payload: boolean }
    | { type: "RepeatedPasswordEdit"; payload: string }
    | { type: "RepeatedPasswordValidate"; payload: boolean };

export function registrationReducer(
    state: RegistrationFormState,
    action: RegistrationFormAction,
): RegistrationFormState {
    switch (action.type) {
        case "UsernameEdit":
            return {
                ...state,
                username: {
                    ...state.username,
                    text: action.payload,
                    isBeingEdited: true,
                },
            };
        case "UsernameValidate":
            return {
                ...state,
                username: {
                    ...state.username,
                    isValid: action.payload,
                    isBeingEdited: false,
                },
            };
        case "EmailEdit":
            return {
                ...state,
                email: {
                    ...state.email,
                    text: action.payload,
                    isBeingEdited: true,
                },
            };
        case "EmailValidate":
            return {
                ...state,
                email: {
                    ...state.email,
                    isValid: action.payload,
                    isBeingEdited: false,
                },
            };
        case "NewPasswordEdit":
            return {
                ...state,
                newPassword: {
                    ...state.newPassword,
                    text: action.payload,
                    isBeingEdited: true,
                },
            };
        case "NewPasswordValidate":
            return {
                ...state,
                newPassword: {
                    ...state.newPassword,
                    isValid: action.payload,
                    isBeingEdited: false,
                },
            };
        case "RepeatedPasswordEdit":
            return {
                ...state,
                repeatedPassword: {
                    ...state.repeatedPassword,
                    text: action.payload,
                    isBeingEdited: true,
                },
            };
        case "RepeatedPasswordValidate":
            return {
                ...state,
                repeatedPassword: {
                    ...state.repeatedPassword,
                    isValid: action.payload,
                    isBeingEdited: false,
                },
            };
    }
}
