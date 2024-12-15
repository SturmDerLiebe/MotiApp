import { Colors } from "@/constants/Colors";
import {
    useCameraContext,
    useCameraDispatchContext,
} from "@/hooks/context/CameraContext";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Button, Pressable, View } from "react-native";

export default function CameraScreen() {
    NavigationBar.setBackgroundColorAsync(Colors.black);

    const { imageUri } = useCameraContext();
    const dispatchCameraState = useCameraDispatchContext();

    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "stretch",
                },
                imageUri === null
                    ? null
                    : { backgroundColor: Colors.graphicSpecific.orange },
            ]}
        >
            <View
                style={{
                    height: "84%",
                }}
            >
                <CameraComponent />
                <ConditionalPicturePreview />
            </View>

            <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
                <Button
                    title="Redo"
                    onPress={() => {
                        dispatchCameraState({ type: "ResetCamera" });
                    }}
                />
                <Button
                    title="Post"
                    onPress={() => {
                        dispatchCameraState({ type: "DisableCamera" });
                        router.navigate("/(tabs)/group");
                    }}
                />
            </View>
        </View>
    );
}

function CameraComponent() {
    const CAMERA_REF = useRef<CameraView>(null);

    const { cameraIsActive } = useCameraContext();
    const dispatchCameraState = useCameraDispatchContext();

    useEffect(
        function handleBackNavigation() {
            const EVENT_SUBSCRIPTION = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    dispatchCameraState({ type: "DisableCamera" });
                    router.navigate("/(tabs)/group");
                    return true;
                },
            );
            return () => EVENT_SUBSCRIPTION.remove();
        },
        [dispatchCameraState],
    );

    useEffect(
        function handleCameraState() {
            if (cameraIsActive) {
                CAMERA_REF.current?.resumePreview();
            } else {
                CAMERA_REF.current?.pausePreview();
            }
        },
        [cameraIsActive],
    );

    const [isCameraReady, setCameraReady] = useState(false);

    return (
        <CameraView
            ref={CAMERA_REF}
            facing="back"
            autofocus="on"
            active={cameraIsActive}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
            }}
            onCameraReady={() => {
                setCameraReady(true);
            }}
        >
            <Pressable
                disabled={!isCameraReady}
                style={{
                    width: "10%",
                    aspectRatio: 1,
                    backgroundColor: isCameraReady ? "red" : "grey",
                }}
                onPress={async () => {
                    const CAMERA = CAMERA_REF.current;
                    if (CAMERA === null) {
                        throw new Error("Ref of CameraView was not set up yet");
                    }

                    const PICTURE = await CAMERA.takePictureAsync({
                        imageType: "jpg",
                    });

                    if (PICTURE === undefined) {
                        throw new Error(
                            "For an unkown reason the internal '_cameraRef.current' was not set up yet and returned 'undefined'",
                        );
                    }

                    dispatchCameraState({
                        type: "SetImageUri",
                        imageUri: PICTURE?.uri,
                    });
                }}
            ></Pressable>
        </CameraView>
    );
}

function ConditionalPicturePreview() {
    const { imageUri } = useCameraContext();

    return imageUri !== null ? (
        <Image
            source={imageUri}
            style={{
                zIndex: 2,
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 12,
                backgroundColor: Colors.graphicSpecific.orange,
            }}
        />
    ) : null;
}
