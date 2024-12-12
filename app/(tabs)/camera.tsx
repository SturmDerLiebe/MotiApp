import {
    useCameraContext,
    useCameraDispatchContext,
} from "@/hooks/context/CameraContext";
import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable } from "react-native";

export default function CameraScreen() {
    const { cameraIsActive } = useCameraContext();
    // const dispatchCameraState = useCameraDispatchContext();

    const CAMERA_REF = useRef<CameraView>(null);

    const [isCameraReady, setCameraReady] = useState(false);

    return (
        <CameraView
            ref={CAMERA_REF}
            facing="back"
            active={cameraIsActive}
            style={{ alignItems: "center", flex: 1 }}
            onCameraReady={() => {
                setCameraReady(true);
            }}
        >
            <Pressable
                disabled={isCameraReady}
                style={{
                    width: "10%",
                    aspectRatio: 1,
                    backgroundColor: isCameraReady ? "red" : "grey",
                }}
                onPress={() => {
                    CAMERA_REF.current?.takePictureAsync({ imageType: "jpg" });
                    //CONTINUE: dispatchCameraState({type: "SetImageUri"})
                }}
            ></Pressable>
        </CameraView>
    );
}
