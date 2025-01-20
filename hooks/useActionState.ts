import { useState } from "react";

export function useActionStatePolyfill<ActionResultType, InitialStateType>(
    action: (
        previousState: InitialStateType | ActionResultType,
        payload: FormData,
    ) => Promise<ActionResultType>,
    initialState: InitialStateType,
): [
    InitialStateType | ActionResultType,
    usableAction: (payload: FormData) => void,
    isPending: boolean,
] {
    const [isPending, setPending] = useState(false);
    const [simpleResponse, setSimpleResponse] = useState<
        InitialStateType | ActionResultType
    >(() => initialState);
    return [
        simpleResponse,
        async (payload: FormData) => {
            setPending(true);
            action(simpleResponse, payload).then((result) => {
                setSimpleResponse(result);
            });
        },
        isPending,
    ];
}
