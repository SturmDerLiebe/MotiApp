import { Colors } from "@/constants/Colors";
import { renderTimes } from "@/utils/componentHelpers";
import React from "react";
import { View, ViewStyle } from "react-native";

export function SlotInputBackground(props: {
  slotAmount: number;
  successPredicate: () => boolean;
  failurePredicate: () => boolean;
  zIndex?: number;
}) {
  const { zIndex = -1 } = props;
  return (
    <View
      accessible={false}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 12,
          position: "absolute",
          zIndex,
        },
      ]}
    >
      {renderTimes(props.slotAmount, (key: number) => (
        <DigitCellBackground key={key} {...props} />
      ))}
    </View>
  );

  function DigitCellBackground(props: {
    key: number;
    successPredicate: () => boolean;
    failurePredicate: () => boolean;
  }) {
    const { successPredicate, failurePredicate } = props;
    return (
      <View
        style={[
          {
            flex: 1,
            aspectRatio: 1,
            borderRadius: 8,
          },
          determineBorderStylesByRequestStatus(
            successPredicate,
            failurePredicate,
          ),
        ]}
        {...props}
      />
    );

    function determineBorderStylesByRequestStatus(
      successPredicate: () => boolean,
      failurePredicate: () => boolean,
    ): ViewStyle {
      if (successPredicate()) {
        return { borderColor: Colors.green, borderWidth: 2 };
      } else if (failurePredicate()) {
        return { borderColor: Colors.red, borderWidth: 2 };
      } else {
        return { borderColor: Colors.grey.dark1, borderWidth: 1 };
      }
    }
  }
}
