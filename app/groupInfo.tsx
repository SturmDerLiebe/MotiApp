import { AvatarImage } from "@/components/chat/MesssageComponent";
import { BurgerMenuButton } from "@/components/navigation/BurgerMenuButton";
import { Colors } from "@/constants/Colors";
import {
    GroupInfo,
    UserProfile,
    useUserInfoContext,
} from "@/hooks/context/UserInfoContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * On Android this modal will *not* blur the background due to issues listed in the [Expo Docs](https://docs.expo.dev/versions/latest/sdk/blur-view/#experimentalblurmethod-1)
 */
export default function GroupInfoModal() {
    const userInfo = useUserInfoContext();

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
            >
                {userInfo instanceof UserInfoSuccess ? (
                    <UserInfoContent
                        groupMembers={userInfo.groupInfo.members}
                    />
                ) : null}
            </View>
        </BlurView>
    );
}
function UserInfoContent({
    groupInfo: { members, groupName, inviteCode },
}: {
    groupInfo: GroupInfo;
}) {
    return (
        <>
            <View>
                <Text>{groupName}</Text>
                <BurgerMenuButton
                    tintColor={Colors.blue.grey}
                    onPress={() => {
                        router.back();
                    }}
                />
            </View>
            <MemberList groupMembers={members} />
        </>
    );
}

function MemberList({ groupMembers }: { groupMembers: UserProfile[] }) {
    return (
        <View style={{ height: "33%", justifyContent: "space-between" }}>
            {groupMembers.map((memberProfile) => {
                return (
                    <View>
                        <AvatarImage
                            imageUri={memberProfile.profileImageUri}
                            diameter={32}
                        />
                    </View>
                );
            })}
        </View>
    );
}
