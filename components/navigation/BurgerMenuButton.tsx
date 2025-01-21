import { MotiColors } from "@/constants/Colors";
import { Icon, Icons } from "@/constants/Icons";
import { Image } from "expo-image";
import type React from "react";
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
                tintColor={tintColor ?? MotiColors.eggplant.dark}
                size={28}
                icon="BurgerMenu"
            />
        </Pressable>
    );
}

export function BurgerMenuButtonWithBackground({
    flex,
    onPress,
}: {
    flex: number;
    onPress: () => void;
}): React.JSX.Element {
    return (
        <Pressable
            aria-label="Go back to Groupchat"
            style={{ flex, aspectRatio: 1 }}
            onPress={onPress}
        >
            <Image
                source={Icons.BurgerMenuWithBackground}
                style={{ aspectRatio: 1, flex: 1 }}
            />
        </Pressable>
    );
}
