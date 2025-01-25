import { useState } from "react";

export function useActionStatePolyfill<
    ActionResultType,
    InitialStateType,
    PayloadType = unknown,
>(
    action: (
        previousState: InitialStateType | ActionResultType,
        payload: PayloadType,
    ) => Promise<ActionResultType>,
    initialState: InitialStateType,
): [
    InitialStateType | ActionResultType,
    usableAction: (payload: PayloadType) => void,
    isPending: boolean,
] {
    const [isPending, setPending] = useState(false);
    const [simpleResponse, setSimpleResponse] = useState<
        InitialStateType | ActionResultType
    >(() => initialState);
    return [
        simpleResponse,
        async (payload: PayloadType) => {
            setPending(true);
            action(simpleResponse, payload).then((result) => {
                setSimpleResponse(result);
            });
        },
        isPending,
    ];
}
