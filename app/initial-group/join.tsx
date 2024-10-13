import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, StyleSheet } from "react-native";
import { RequestSuccess, isFailedRequest } from "@/utils/RegistrationStatus";
import { SlotInputBackground } from "@/components/input/slot/SlotInputBackground";
import { SlotInputField } from "@/components/input/slot/SlotInputField";
import useGroupJoinState from "@/hooks/group/useGroupJoinState";

const styles = StyleSheet.create({
  middleText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p6,
  },
});

const BODY_STYLES = StyleSheet.create({
  nonScrollable: {
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "85%",
    height: "90%",
  },
});

const INPUT_STYLES = StyleSheet.create({
  slotInputBox: {
    alignSelf: "center",
    width: "90%",
    height: "14.5%",
    justifyContent: "space-between",
  },
});

export default function InviteScreen() {
  useAndroidBackButtonInputHandling();

  const [JOIN_STATE, START_JOINING] = useGroupJoinState();

  const SLOT_AMOUNT = 5;
  // useNavigateOnSuccessEffect(, "");

  return (
    <View style={[BODY_STYLES.nonScrollable]}>
      <Heading5>Join a Group Chat!</Heading5>

      <View style={INPUT_STYLES.slotInputBox}>
        <Text style={styles.middleText}>Enter a 5 Digit Code</Text>

        <View style={{ justifyContent: "center" }}>
          <SlotInputBackground
            slotAmount={SLOT_AMOUNT}
            columnGap={7}
            successPredicate={successPredicate}
            failurePredicate={failurePredicate}
          />
          <SlotInputField
            keyboardType="numeric"
            slotAmount={SLOT_AMOUNT}
            width="102.5%"
            height="80%"
            letterSpacing={35}
            fontStyle="medium"
            onChange={function (text: string) {
              if (text.length === SLOT_AMOUNT) {
                START_JOINING(text);
              }
            }}
            failurePredicate={failurePredicate}
            alignSelf="center"
          />
        </View>
      </View>

      <View style={{ height: "50%" }} />

      <PrimaryButton
        title={"Start Your Journey"}
        disabled={!successPredicate()}
        onPress={() => {}}
      />
    </View>
  );

  function successPredicate(): boolean {
    return JOIN_STATE instanceof RequestSuccess;
  }

  function failurePredicate() {
    return isFailedRequest(JOIN_STATE);
  }
}
