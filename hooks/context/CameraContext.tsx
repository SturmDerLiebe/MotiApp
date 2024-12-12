import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useReducer,
} from "react";

type CameraAction =
    | { type: "ResetImageUri" }
    | { type: "SetImageUri"; imageUri: string }
    | { type: "EnableCamera" }
    | { type: "DisableCamera" }
    | { type: "DisableCamera" };

interface CameraState {
    imageUri: string | null;
    cameraIsActive: boolean;
}

const INITIAL_CAMERA_STATE: CameraState = {
    imageUri: null,
    cameraIsActive: false,
};

const CameraContext = createContext(INITIAL_CAMERA_STATE);

export function useCameraContext() {
    return useContext(CameraContext);
}

export const CameraDispatchContext = createContext<
    React.Dispatch<CameraAction>
>(() => {});

export function useCameraDispatchContext() {
    return useContext(CameraDispatchContext);
}

export function CameraProvider({ children }: PropsWithChildren) {
    const [cameraState, dispatchCameraState] = useReducer<
        React.Reducer<CameraState, CameraAction>
    >(reducer, INITIAL_CAMERA_STATE);

    return (
        <CameraContext.Provider value={cameraState}>
            <CameraDispatchContext.Provider value={dispatchCameraState}>
                {children}
            </CameraDispatchContext.Provider>
        </CameraContext.Provider>
    );
}

function reducer(state: CameraState, action: CameraAction): CameraState {
    switch (action.type) {
        case "SetImageUri": {
            return { ...state, imageUri: action.imageUri };
        }
        case "ResetImageUri": {
            return { ...state, imageUri: null };
        }
        case "EnableCamera": {
            return { ...state, cameraIsActive: true };
        }
        case "DisableCamera": {
            return { ...state, cameraIsActive: false };
        }
    }
}
