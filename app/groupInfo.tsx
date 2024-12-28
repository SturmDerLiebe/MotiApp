import { DangerButton, PrimaryButton } from "@/components/Buttons";
import { AvatarImage } from "@/components/chat/MesssageComponent";
import { BurgerMenuButtonWithBackground } from "@/components/navigation/BurgerMenuButton";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useUserInfoContext } from "@/hooks/context/UserInfoContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import { BlurView } from "expo-blur";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

/**
 * On Android this modal will *not* blur the background due to issues listed in the [Expo Docs](https://docs.expo.dev/versions/latest/sdk/blur-view/#experimentalblurmethod-1)
 */
export default function GroupInfoModal() {
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync("#b2b8c0");
        return () => {
            NavigationBar.setBackgroundColorAsync(Colors.grey.light1);
        };
    });

    return (
        <BlurView
            intensity={4}
            style={{
                flex: 1,
                backgroundColor: Colors.grey.dark3_50_Percent,
                alignItems: "flex-end",
            }}
        >
            <View style={{ height: "5%" }} />
            <View
                style={{
                    width: "56%",
                    height: "80%",
                    gap: 24,
                    backgroundColor: Colors.white,
                    borderStartStartRadius: 20,
                    borderStartEndRadius: 20,
                    padding: 16,
                }}
            >
                <UserInfoContent />
            </View>
        </BlurView>
    );
}
function UserInfoContent() {
    return (
        <>
            <HeadingRow />
            <MemberList />
            <ButtonColumn />
        </>
    );
}

function HeadingRow() {
    const userInfo = useUserInfoContext();
    const USERNAME =
        userInfo instanceof UserInfoSuccess
            ? userInfo.groupInfo.groupName
            : "Loading...";

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text style={[Fonts.paragraph.p2, { width: "77%" }]}>
                {USERNAME}
            </Text>
            <BurgerMenuButtonWithBackground
                flex={1}
                onPress={() => {
                    router.back();
                }}
            />
        </View>
    );
}

function MemberList() {
    const userInfo = useUserInfoContext();
    const MEMBER_LIST =
        userInfo instanceof UserInfoSuccess ? userInfo.groupInfo.members : [];

    return (
        <View style={{ flex: 1, gap: 16, paddingVertical: 8 }}>
            {MEMBER_LIST.map((memberProfile) => {
                return (
                    <View
                        key={memberProfile.userId}
                        style={{
                            flexDirection: "row",
                            gap: 6.5,
                            alignItems: "center",
                        }}
                    >
                        <AvatarImage
                            imageUri={memberProfile.profileImageUri}
                            diameter={32}
                        />
                        <Text>{memberProfile.username}</Text>
                    </View>
                );
            })}
        </View>
    );
}

function ButtonColumn() {
    const DISABLED = !(useUserInfoContext() instanceof UserInfoSuccess);

    return (
        <View style={{ height: "13%", justifyContent: "space-between" }}>
            <PrimaryButton
                title="Invite a friend"
                disabled={DISABLED}
                onPress={() => {
                    //TODO: Share from React Native
                }}
                textStyle={{ paddingVertical: 8 }}
            />
            <DangerButton
                title="Exit"
                disabled={DISABLED}
                icon="Exit"
                onPress={() => {
                    //TODO: Alert
                    router.navigate("/group");
                }}
                textStyle={{ paddingVertical: 8 }}
            />
        </View>
    );
}
