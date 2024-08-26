import { Text, View } from "react-native";

export default function IndexScreen() {
  let username,
    progressBasedMotivation,
    groupProgress,
    groupGoal,
    personalProgress,
    personalGoal,
    timeBasedCalltoAction,
    timeLeftHHMM;

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        TestStyles,
      ]}
    >
      <Text style={TestStyles}>{`Hi, ${username ?? "You"}`}</Text>

      <View style={TestStyles}>
        <Text>Your progress so far</Text>
        <Text>{progressBasedMotivation ?? "You are doing great!"}</Text>

        <Text>Group's Goal</Text>
        <Text>{`${groupProgress ?? 0}/${groupGoal ?? 0}`}</Text>
        <Text>Your Goal</Text>
        <Text>{`${personalProgress ?? 0}/${personalGoal ?? 0}`}</Text>

        {/* Image */}
      </View>

      <View style={TestStyles}>
        <Text>Time Remaining</Text>
        <Text>{timeBasedCalltoAction ?? "Keep Going!"}</Text>
        <Text>{timeLeftHHMM}</Text>
      </View>
    </View>
  );
}

export const TestStyles = { borderColor: "black", borderWidth: 1 };
