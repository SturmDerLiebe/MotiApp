import { View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { PrimaryButton } from "@/components/Buttons";

const LOGO_SVG = require("@/assets/images/Logo/LogoWithName.svg");

export default function ChooseRegistrationOrLoginScreen() {
  const BUTTON_WIDTH = "48%";
  return (
    <View
      style={[
        {
          height: "90%",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "stretch",
          alignSelf: "center",
        },
      ]}
    >
      <Image
        source={LOGO_SVG}
        contentFit="contain"
        style={{ width: "95%", aspectRatio: 1, alignSelf: "center" }}
      />

      <View style={{ justifyContent: "space-between", height: "15%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PrimaryButton
            title="Register"
            onPress={() => router.push("/register")}
            style={{ width: BUTTON_WIDTH }}
          />
          <PrimaryButton
            title="Login"
            onPress={function () {}}
            style={{ width: BUTTON_WIDTH }}
          />
        </View>
        <PrimaryButton title="Login with Google" onPress={function () {}} />
      </View>
    </View>
  );
}
