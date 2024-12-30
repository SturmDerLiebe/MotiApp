import { DangerButton, PrimaryButton } from "@/components/Buttons";
import { AvatarImage } from "@/components/chat/MesssageComponent";
import { BurgerMenuButtonWithBackground } from "@/components/navigation/BurgerMenuButton";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import GroupRepository from "@/data/repository/GroupRepository";
import { useUserInfoContext } from "@/hooks/context/UserInfoContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import { BlurView } from "expo-blur";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, Share, Text, View } from "react-native";

/**
 * On Android this modal will *not* blur the background due to issues listed in the [Expo Docs](https://docs.expo.dev/versions/latest/sdk/blur-view/#experimentalblurmethod-1)
 */
export default function GroupInfoModal() {
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync("#b2b8c0");
    });

    return (
        <Pressable
            style={{ flex: 1 }}
            onPress={() => {
                router.back();
            }}
        >
            <BlurView
                intensity={4}
                style={{
                    flex: 1,
                    backgroundColor: Colors.grey.dark3_50_Percent,
                    alignItems: "flex-end",
                }}
            >
                <View style={{ height: "5%" }} />
                <Pressable
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
                </Pressable>
            </BlurView>
        </Pressable>
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
    const USER_INFO_EXISTS = userInfo instanceof UserInfoSuccess;
    const MEMBER_LIST = USER_INFO_EXISTS ? userInfo.groupInfo.members : [];

    return (
        <View style={{ flex: 1, gap: 16, paddingVertical: 8 }}>
            {MEMBER_LIST.map((memberProfile) => {
                const IS_CURRENT_USER =
                    USER_INFO_EXISTS &&
                    userInfo.userId === memberProfile.userId;

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
                        <Text>{`${memberProfile.username}${IS_CURRENT_USER ? " (You)" : ""}`}</Text>
                    </View>
                );
            })}
        </View>
    );
}

function ButtonColumn() {
    const USER_INFO = useUserInfoContext();
    const USER_INFO_EXISTS = USER_INFO instanceof UserInfoSuccess;

    return (
        <View style={{ height: "13%", justifyContent: "space-between" }}>
            <PrimaryButton
                title="Invite a friend"
                disabled={!USER_INFO_EXISTS}
                onPress={() => {
                    if (USER_INFO_EXISTS) {
                        Share.share(
                            {
                                message: USER_INFO.groupInfo.inviteCode,
                            },
                            {
                                dialogTitle:
                                    "Share this code with your friends",
                            },
                        );
                    }
                }}
                textStyle={{ paddingVertical: 8 }}
            />
            <DangerButton
                title="Exit"
                disabled={!USER_INFO_EXISTS}
                iconData={{ name: "Exit", size: 20 }}
                onPress={() => {
                    if (USER_INFO_EXISTS) {
                        showAlert(USER_INFO.groupInfo.groupName);
                    }
                }}
                textStyle={{ paddingVertical: 8 }}
            />
        </View>
    );
}

function showAlert(groupName: string): void {
    Alert.alert(
        "Do you want to leave the group chat ?",
        `Are you sure you want to leave “${groupName}” group chat?`,
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Leave Group",
                style: "destructive",
                onPress: () => {
                    GroupRepository.leaveCurrentGroup();
                },
            },
        ],
        { cancelable: true },
    );
}
