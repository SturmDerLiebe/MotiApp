import { areAnyFieldsPredicate } from "@/utils/Object";
import type { RegistrationFormState } from "./Types";
import { RegistrationDTO } from "motidata";

export function areAnyFieldsInvalid(
    registrationFormState: RegistrationFormState,
): boolean {
    return areAnyFieldsPredicate(
        registrationFormState,
        (value) => !value.isValid,
    );
}

export function areAnyFieldsBeingEdited(
    registrationFormState: RegistrationFormState,
): boolean {
    return areAnyFieldsPredicate(
        registrationFormState,
        (value) => value.isBeingEdited,
    );
}

export function transformRegistrationFormStateToDTO(
    registrationFormState: RegistrationFormState,
): RegistrationDTO {
    return {
        username: registrationFormState.username.text,
        email: registrationFormState.email.text,
        password: registrationFormState.newPassword.text,
    };
}
