import { MotiColors } from "@/constants/Colors";
import { MessageType, NewChatMessage } from "@/data/DTO/ChatMessage";
import {
    CameraAction,
    useCameraContext,
    useCameraDispatchContext,
} from "@/hooks/context/CameraContext";
import { useUserInfoContext } from "@/hooks/context/UserInfoContext";
import { useMessagingContext } from "@/hooks/context/message/MessagingContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Button, Pressable, View } from "react-native";

export default function CameraScreen() {
    NavigationBar.setBackgroundColorAsync(MotiColors.black);

    const userInfo = useUserInfoContext();

    const { cameraIsActive, imageUri } = useCameraContext();
    const dispatchCameraState = useCameraDispatchContext();

    const [, sendNewMessage] = useMessagingContext();

    useEffect(() => {
        if (imageUri !== null && !cameraIsActive) {
            const NEW_MESSAGE = new NewChatMessage(
                userInfo instanceof UserInfoSuccess ? userInfo.userId : null,
                imageUri,
                MessageType.IMAGE,
                true,
            );
            sendNewMessage(NEW_MESSAGE);
            dispatchCameraState({ type: "ConsumeImageUri" });
        }
    }, [
        userInfo,
        sendNewMessage,
        dispatchCameraState,
        cameraIsActive,
        imageUri,
    ]);

    useEffect(
        function handleBackNavigation() {
            const EVENT_SUBSCRIPTION = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    navigateBackFromCamera(dispatchCameraState);
                    return true;
                },
            );
            return () => EVENT_SUBSCRIPTION.remove();
        },
        [dispatchCameraState],
    );

    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "stretch",
                    paddingBlockStart: "10%",
                },
                imageUri === null
                    ? null
                    : { backgroundColor: MotiColors.graphicSpecific.orange },
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

            <ConditionalButtonRow />
        </View>
    );
}

function CameraComponent() {
    const CAMERA_REF = useRef<CameraView>(null);

    const { cameraIsActive } = useCameraContext();
    const dispatchCameraState = useCameraDispatchContext();

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
                        imageUri: PICTURE.uri,
                    });
                }}
            ></Pressable>
        </CameraView>
    );
}

function ConditionalPicturePreview() {
    const { imageUri } = useCameraContext();

    return imageUri !== null ? (
        <View
            style={{
                zIndex: 1,
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: MotiColors.graphicSpecific.orange,
            }}
        >
            <Image
                source={imageUri}
                style={{
                    flex: 1,
                    borderRadius: 12,
                }}
            />
        </View>
    ) : null;
}

function ConditionalButtonRow() {
    const { imageUri } = useCameraContext();
    const dispatchCameraState = useCameraDispatchContext();

    return imageUri === null ? (
        <Button
            title="Back"
            onPress={() => {
                navigateBackFromCamera(dispatchCameraState);
            }}
        />
    ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button
                title="Redo"
                onPress={() => {
                    dispatchCameraState({ type: "ResetCamera" });
                }}
            />
            <Button
                title="Post"
                onPress={() => {
                    navigateBackFromCamera(dispatchCameraState);
                }}
            />
        </View>
    );
}

function navigateBackFromCamera(
    dispatchCameraState: React.Dispatch<CameraAction>,
) {
    dispatchCameraState({ type: "DisableCamera" });
    router.navigate("/(tabs)/group");
}
