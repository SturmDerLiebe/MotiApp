import type { MutableRefObject } from "react";

export type SetRefType<RefType> = (
    inputRef: MutableRefObject<null | RefType>,
) => void;
