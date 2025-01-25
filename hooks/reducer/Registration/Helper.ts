import { areAnyFieldsPredicate } from "@/utils/Object";
import type { RegistrationFormState } from "./Types";

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

}
