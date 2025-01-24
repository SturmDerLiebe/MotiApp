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

export const InitialRegistrationFormState: RegistrationFormState = {
    username: { text: "", isValid: null, isBeingEdited: false },
    email: { text: "", isValid: null, isBeingEdited: false },
    newPassword: { text: "", isValid: null, isBeingEdited: false },
    repeatedPassword: { text: "", isValid: null, isBeingEdited: false },
};

export function areAnyFieldsInvalid(
    registrationFormState: RegistrationFormState,
) {
    return areAnyFieldsPredicate(
        registrationFormState,
        (value) => !value.isValid,
    );
}

export function areAnyFieldsBeingEdited(
    registrationFormState: RegistrationFormState,
) {
    return areAnyFieldsPredicate(
        registrationFormState,
        (value) => value.isBeingEdited,
    );
}

export function areAnyFieldsPredicate<T extends Record<string, unknown>>(
    obj: T,
    predicate: (value: T[keyof T]) => boolean,
) {
    return Object.values<T[keyof T]>(obj as { [key: string]: T[keyof T] }).some(
        predicate,
    );
}

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
