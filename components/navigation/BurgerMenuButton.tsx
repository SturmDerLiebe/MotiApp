import { Colors } from "@/constants/Colors";
import { Icon } from "@/constants/Icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function BurgerMenuButton(props: { tintColor: string }) {
  return (
    <Pressable
      aria-label="Group Information and Actions"
      onPress={() => router.navigate("/")}
    >
      <Icon
        tintColor={props.tintColor ?? Colors.eggplant.dark}
        size={28}
        icon="BurgerMenu"
      />
    </Pressable>
  );
}
