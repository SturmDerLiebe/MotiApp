import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { Fonts } from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import useAndroidBackButtonInputHandling from "@/hooks/useAndroidBackButtonInputHandling";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { PropsWithChildren, useState } from "react";
import { isEmpty } from "@/utils/StringHelpers";
import useGroupCreationState from "@/hooks/group/useGroupCreationState";
import {
  GroupCreationSuccess,
  NetworkError,
  RequestError,
  RequestStatus,
} from "@/utils/RegistrationStatus";
import useNavigateOnSuccessEffect from "@/hooks/navigation/useNavigationOnSuccessEffect";

const GROUP_NAME_PATTERN = /^[\p{L}\p{S}]+(?:\s[\p{L}\p{S}]+){0,4}$/u;

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
});

export default function GroupCreationScreen() {
  useAndroidBackButtonInputHandling();

  const [groupName, setGroupName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [groupCreationState, startGroupCreation] = useGroupCreationState();

  useNavigateOnSuccessEffect(groupCreationState, {
    pathname: "/initial-group/invite",
    params: {
      joinCode:
        groupCreationState instanceof GroupCreationSuccess
          ? groupCreationState.joinCode
          : "ERROR",
    },
  });

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
        <Heading5>Create a Group Chat!</Heading5>
        <Text style={styles.topText}>Enter a name for your group chat</Text>
      </View>

      <View
        style={{
          height: "12%",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.middleText]}>Group Name</Text>
        <TextInput
          maxLength={30}
          placeholder="Enter a Group Name"
          placeholderTextColor={Colors.grey.dark2}
          onChange={function handleInput({ nativeEvent: { text } }) {
            setGroupName(text);
          }}
          onEndEditing={function checkValidity({ nativeEvent: { text } }) {
            setIsValid(GROUP_NAME_PATTERN.test(text));
          }}
          value={groupName}
          style={[
            BASE_INPUT_STYLES.basic,
            {
              borderColor: determineBorderColor(),
            },
          ]}
        />
      </View>

      <View style={{ height: "40%", justifyContent: "center" }}>
        {determineErrorComponent()}
      </View>

      <View
        style={{
          height: "14%",
          justifyContent: "flex-end",
        }}
      >
        <PrimaryButton
          title={"Next Step"}
          disabled={isEmpty(groupName) || !isValid}
          onPress={() => {
            startGroupCreation(groupName);
          }}
        />
      </View>
    </View>
  );

  function determineBorderColor() {
    if (isEmpty(groupName)) {
      return Colors.grey.dark2;
    } else if (!isValid) {
      return Colors.red;
    } else {
      return Colors.blue.grey;
    }
  }

  function determineErrorComponent() {
    if (!isValid) {
      return (
        <ErrorText>
          {
            "Please only provide Letters and Emojis seperated by up to a single Space for your Group's name"
          }
        </ErrorText>
      );
    } else if (isErrorState(groupCreationState)) {
      return <ErrorText>{groupCreationState.message}</ErrorText>;
    } else {
      return null;
    }
  }

  //TODO: Refactor out
  function isErrorState(
    state: RequestStatus | null,
  ): state is RequestError | NetworkError {
    return (
      groupCreationState instanceof RequestError ||
      groupCreationState instanceof NetworkError
    );
  }

  //TODO: Refactor out
  function ErrorText(props: PropsWithChildren) {
    return (
      <Text style={[styles.topText, { color: Colors.red }]}>
        {props.children}
      </Text>
    );
  }
}

export const BASE_INPUT_STYLES = StyleSheet.create({
  basic: {
    color: Colors.blue.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...Fonts.paragraph.p4,
  },
});
