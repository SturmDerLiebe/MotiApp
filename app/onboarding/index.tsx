import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { HorizontalSpacer } from "@/components/layout/Spacer";
import { Paragraph3 } from "@/components/text/paragraph";
import { Image } from "expo-image";
import { View } from "react-native";

export default function GroupExplainerScreen() {
    return (
        <View style={{ flex: 1 }}>
            <Image style={{ height: "45%", aspectRatio: 1 }} />
            <HorizontalSpacer height="4%" />
            <Heading5>Create a fitness group</Heading5>
            <HorizontalSpacer height="2%" />
            <Paragraph3>
                Stay connected and motivated by creating a group with your
                friends! Invite your workout buddies to join you on this fitness
                journey, and encourage each other to crush your goals
            </Paragraph3>
            <PrimaryButton
                iconData={{
                    name: "LeftArrow",
                    size: 32,
                    ariaLabel: "Continue",
                }}
                onPress={() => {}}
            />
        </View>
    );
}
