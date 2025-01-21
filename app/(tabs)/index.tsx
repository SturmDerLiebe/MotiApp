import { SingleCircularProgress } from "@/components/progress/circular/SingleCircularProgress";
import { MotiColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { BODY_STYLES } from "@/constants/styles/Body";
import { useUserInfoContext } from "@/hooks/context/UserInfoContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import { Text, View } from "react-native";

export default function IndexScreen() {
    const userInfoState = useUserInfoContext();

    return userInfoState instanceof UserInfoSuccess ? (
        <View style={[BODY_STYLES.dashboard]}>
            <Text
                style={[{ color: MotiColors.blue.grey }, Fonts.title.h6]}
            >{`Hi, ${userInfoState.getUsernameOfCurrentUser() ?? "You"}!`}</Text>
            <View>
                <Text
                    style={[
                        Fonts.paragraph.p2,
                        { color: MotiColors.blue.grey },
                    ]}
                >
                    Your progress so far
                </Text>
                <Text
                    style={[
                        Fonts.paragraph.p10,
                        { color: MotiColors.grey.dark3 },
                    ]}
                >
                    Keep going! You are doing really amazing!
                </Text>
            </View>

            <View
                style={[
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        aspectRatio: 1,
                    },
                ]}
            >
                <SingleCircularProgress
                    progress={userInfoState.progress}
                    width={"100%"}
                />

                <View
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={[
                            { color: MotiColors.orange.dark },
                            Fonts.title.h5,
                        ]}
                    >
                        Your Goal
                    </Text>
                    <Text
                        style={[
                            { color: MotiColors.orange.dark },
                            Fonts.title.h5,
                        ]}
                    >{`${userInfoState.personalProgress ?? 0}/${userInfoState.personalGoal ?? 0}`}</Text>
                </View>
            </View>

            <View style={{ height: "18%" }} />
        </View>
    ) : (
        <Text>Loading</Text>
    );
}
