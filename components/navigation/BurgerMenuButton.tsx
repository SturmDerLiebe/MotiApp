import { Colors } from "@/constants/Colors";
import { Icon } from "@/constants/Icons";
import { Pressable } from "react-native";

export function BurgerMenuButton({
    tintColor,
    onPress,
}: {
    tintColor: string;
    onPress: () => void;
}) {
    return (
        <Pressable aria-label="Group Information and Actions" onPress={onPress}>
            <Icon
                tintColor={tintColor ?? Colors.eggplant.dark}
                size={28}
                icon="BurgerMenu"
            />
        </Pressable>
    );
}
