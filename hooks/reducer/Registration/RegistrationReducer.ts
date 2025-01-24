import type { RegistrationFormAction, RegistrationFormState } from "./Types";

export const InitialRegistrationFormState: RegistrationFormState = {
    username: { text: "", isValid: null, isBeingEdited: false },
    email: { text: "", isValid: null, isBeingEdited: false },
    newPassword: { text: "", isValid: null, isBeingEdited: false },
    repeatedPassword: { text: "", isValid: null, isBeingEdited: false },
};

export function registrationFormReducer(
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
