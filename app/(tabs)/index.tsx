import { SingleCircularProgress } from "@/components/progress/circular/SingleCircularProgress";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { BODY_STYLES } from "@/constants/styles/Body";
import useUserInfoState from "@/hooks/profile/useUserInfoState";
import { UserInfoSuccess } from "@/utils/RegistrationStatus";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  const [USER_INFO_STATE, START_USER_INFO_REQUEST] = useUserInfoState();
  //TODO: Use useFocusEffect() instead
  useEffect(() => {
    START_USER_INFO_REQUEST();
  }, [START_USER_INFO_REQUEST]);

  return USER_INFO_STATE instanceof UserInfoSuccess ? (
    <SafeAreaView style={[BODY_STYLES.dashboard]}>
      <View style={{ height: "1%" }} />

      <Text
        style={[{ color: Colors.blue.grey }, Fonts.title.h6]}
      >{`Hi, ${USER_INFO_STATE.username ?? "You"}!`}</Text>
      <View>
        <Text style={[Fonts.paragraph.p2, { color: Colors.blue.grey }]}>
          Your progress so far
        </Text>
        <Text style={[Fonts.paragraph.p10, { color: Colors.grey.dark3 }]}>
          Keep going! You are doing really amazing!
        </Text>
      </View>

      <View
        style={[
          { justifyContent: "center", alignItems: "center", aspectRatio: 1 },
        ]}
      >
        <SingleCircularProgress
          progress={USER_INFO_STATE.progress}
          width={"100%"}
        />

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[{ color: Colors.orange.dark }, Fonts.title.h5]}>
            Your Goal
          </Text>
          <Text
            style={[{ color: Colors.orange.dark }, Fonts.title.h5]}
          >{`${USER_INFO_STATE.personalProgress ?? 0}/${USER_INFO_STATE.personalGoal ?? 0}`}</Text>
        </View>
      </View>

      <View style={{ height: "18%" }} />
    </SafeAreaView>
  ) : (
    <Text>Loading</Text>
  );
}
