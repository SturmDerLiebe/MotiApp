import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { setStringAsync } from "expo-clipboard";

export default function InviteScreen() {
  const { joinCode } = useLocalSearchParams<{ joinCode: string }>();
  return (
    <>
      <View
        style={[
          {
            alignSelf: "center",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "85%",
            height: "90%",
          },
        ]}
      >
        <View>
          <Heading5>Invite Friends!</Heading5>
          <Text
            style={[TEXT_STYLES.topText, { width: "90%", alignSelf: "center" }]}
          >
            Share this referral code to invite your friends to the group chat
          </Text>
        </View>

        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "12%",
            },
            BASE_INPUT_STYLES.copyField,
          ]}
        >
          <TextInput
            readOnly={true}
            value={joinCode}
            style={[TEXT_STYLES.copyText, { paddingTop: 30 }]}
          />
          <Pressable
            onPress={async function copyToClipboard() {
              await setStringAsync(joinCode);
            }}
            style={[
              BASE_BUTTON_STYLES.secondary,
              {
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
                aspectRatio: 1.25,
              },
            ]}
          >
            <Text style={TEXT_STYLES.secondaryButtonText}>Copy</Text>
          </Pressable>
        </View>

        <View style={{ height: "50%" }} />

        <PrimaryButton title={"Start your Journey"} onPress={() => {}} />
      </View>

      <Image
        source={require("@/assets/images/BasketBallPlayer.svg")}
        style={{
          zIndex: -1,
          position: "absolute",
          top: 225,
          width: "100%",
          aspectRatio: 1,
        }}
      />
    </>
  );
}

const TEXT_STYLES = StyleSheet.create({
  topText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
  middleText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p9,
  },
  secondaryButtonText: { color: Colors.blue.grey, ...Fonts.paragraph.p1 },
  copyText: { color: Colors.white, ...Fonts.title.h2 },
});

export const BASE_INPUT_STYLES = StyleSheet.create({
  copyField: {
    backgroundColor: Colors.blue.grey,
    borderRadius: 100,
    paddingStart: 24,
    paddingEnd: 6,
  },
});

export const BASE_BUTTON_STYLES = StyleSheet.create({
  secondary: {
    backgroundColor: Colors.white,
    borderRadius: 100,
  },
});
