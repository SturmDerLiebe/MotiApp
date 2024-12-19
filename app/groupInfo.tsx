import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

/**
 * On Android this modal will *not* blur the background due to issues listed in the [Expo Docs](https://docs.expo.dev/versions/latest/sdk/blur-view/#experimentalblurmethod-1)
 */
export default function GroupInfoModal() {
    return (
        <BlurView
            intensity={4}
            style={{
                flex: 1,
                backgroundColor: Colors.grey.dark3_50_Percent,
                alignItems: "flex-end",
            }}
        >
            <View style={{ height: "10%" }} />
            <View
                style={{
                    width: "56%",
                    height: "69%",
                    backgroundColor: Colors.white,
                    borderWidth: StyleSheet.hairlineWidth,
                }}
            ></View>
        </BlurView>
    );
}
