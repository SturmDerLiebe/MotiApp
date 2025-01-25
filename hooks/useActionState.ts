import { useState } from "react";

export function useActionStatePolyfill<
    ActionResultType,
    InitialStateType,
    PayloadType,
>(
    action: (
        previousState: InitialStateType | ActionResultType,
        payload: PayloadType,
    ) => Promise<ActionResultType>,
    initialState: InitialStateType,
): [
    InitialStateType | ActionResultType,
    usableAction: (payload: PayloadType) => Promise<void>,
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

            const RESULT = await action(simpleResponse, payload);
            setSimpleResponse(RESULT);

            setPending(false);
        },
        isPending,
    ];
}
