import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {
  NetworkError,
  RequestError,
  RequestSuccess,
} from "@/utils/RegistrationStatus";
import usePersonalGoal from "@/hooks/profile/usePersonalGoal";
import { useState } from "react";
import { DigitString } from "@/utils/UtilityClasses";
import { FormatError } from "@/utils/CustomErrors";
import { NullBoolean } from "@/hooks/useRegistrationValidityState";

const styles = StyleSheet.create({
  topText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
    textAlign: "center",
  },
  middleText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p9,
  },
  bottomText: {
    color: Colors.grey.dark3,
    ...Fonts.paragraph.p5,
  },
});

export default function TestScreen() {
  useAndroidBackButtonInputHandling();

  const [goalInput, setGoalInput] = useState("");
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isValid, setIsValid] = useState<NullBoolean>(null);
  const [personalGoal, setPersonalGoal] = usePersonalGoal();

  return (
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
        <Heading5>Set Your Weekly Goal</Heading5>
        <Text style={styles.topText}>
          Set your weekly fitness goal with MotiMate.
        </Text>
        <Text style={styles.topText}>Enter your desired workout quantity.</Text>
      </View>

      <View style={{ height: "10%" }} />
      <View
        style={{
          alignSelf: "center",
          height: "24%",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          selectionColor="#80808000"
          keyboardType="numeric"
          maxLength={1}
          onChange={function handleInput({ nativeEvent: { text } }) {
            setIsValid(null);
            setIsBeingEdited(true);
            setGoalInput(text);
          }}
          value={goalInput}
          style={[
            {
              width: "40%",
              aspectRatio: 1,
              color: determineColor(),
              borderColor: determineBorderColor(),
              borderWidth: 2,
              borderRadius: 100,
              textAlign: "center",
              ...Fonts.digits.extra,
            },
          ]}
        />
        <Text style={[styles.middleText, { textAlign: "center" }]}>
          Enter the Quantity
        </Text>
      </View>

      <View style={{ height: "40%", justifyContent: "center" }}>
        {isValid === false ? (
          <Text>Please only use numbers as Input</Text>
        ) : //Nested Ternary since this is a sample only
        personalGoal instanceof RequestError ||
          personalGoal instanceof NetworkError ? (
          <Text>{personalGoal.message}</Text>
        ) : null}
      </View>

      <View
        style={{
          height: "14%",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.bottomText}>
          You can adjust or reduce your workout quantity anytime in your
          personal account.
        </Text>

        <PrimaryButton
          title={
            personalGoal instanceof RequestSuccess ? "Success" : "Set Goal"
          }
          disabled={isEmpty(goalInput) || isValid === false}
          onPress={() => {
            setIsBeingEdited(false);
            try {
              const safeGoalInput = new DigitString(goalInput);
              setPersonalGoal(safeGoalInput);
            } catch (error) {
              if (error instanceof FormatError) {
                setIsValid(false);
                return;
              } else {
                throw error;
              }
            }
          }}
        />
      </View>
    </View>
  );

  function determineBorderColor() {
    if (isEmpty(goalInput)) {
      return Colors.grey.dark1;
    } else if (isBeingEdited) {
      return Colors.blue.grey;
    } else if (personalGoal instanceof RequestError || isValid === false) {
      return Colors.red;
    } else {
      return Colors.blue.grey;
    }
  }

  function determineColor() {
    if (isEmpty(goalInput)) {
      return Colors.grey.dark1;
    } else {
      return Colors.blue.grey;
    }
  }

  function isEmpty(s: string) {
    return s.length === 0;
  }
}
