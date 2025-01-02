import {
    OnboardingBitmapImage,
    OnboardingSlotLayout,
} from "@/components/onboarding/OnboardingComponents";
import { View } from "react-native";

export default function GroupExplainerScreen() {
    return (
        <OnboardingSlotLayout
            title="Create a fitness group"
            paragraph="Stay connected and motivated by creating a group with your friends! Invite your workout buddies to join you on this fitness journey, and encourage each other to crush your goals "
            nextRoute={"/onboarding/goal-explainer"}
        >
            <View style={{ paddingHorizontal: "6%" }}>
                <OnboardingBitmapImage bitmap="GroupExplainer" />
            </View>
        </OnboardingSlotLayout>
    );
}
