import { SimpleResponse } from "motidata";
import { RegistrationFormState } from "../reducer/Registration/Types";
import { UserRepositoryInstance } from "@/new_data";
import { transformRegistrationFormStateToDTO } from "../reducer/Registration/Helper";

export async function registrationAction(
    _previousState: SimpleResponse | null,
    payload: RegistrationFormState,
): Promise<SimpleResponse> {
    // TODO: #2
    try {
        return UserRepositoryInstance.registerUser(
            transformRegistrationFormStateToDTO(payload),
        );
    } catch {
        return { ok: false, statusCode: 600 };
    }
}
