import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

export default function ChooseCreateOrJoinGroupScreen() {
  return (
    <View
      style={[
        {
          height: "50%",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "stretch",
          alignSelf: "center",
        },
      ]}
    >
      <View style={{ alignSelf: "center", alignItems: "center", width: "80%" }}>
        <Heading5 style={[{ width: "90%" }]}>
          Join or Create a Group Chat!
        </Heading5>
        <Text style={[TEXT_STYLES.topText]}>
          Each group has its own referral code.
        </Text>
        <Text style={[TEXT_STYLES.topText]}>
          Enter the code to join the Group chat or Create a new Group chat!
        </Text>
      </View>
      <View style={{ justifyContent: "space-between", height: "29%" }}>
        <PrimaryButton
          title="Join a Group"
          onPress={() => router.navigate("/initial-group/join")}
        />
        <SecondaryButton
          title="Create a New Group"
          onPress={() => router.navigate("/initial-group/create")}
        />
      </View>
    </View>
  );
}

const TEXT_STYLES = StyleSheet.create({
  topText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
});
