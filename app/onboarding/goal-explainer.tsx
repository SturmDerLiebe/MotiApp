import {
    OnboardingSlotLayout,
    OnboardingVectorImage,
} from "@/components/onboarding/OnboardingComponents";

export default function GoalExplainerScreen() {
    return (
        <OnboardingSlotLayout
            title="Own Workout goal"
            paragraph="Pick the number of weekly workouts that fits your schedule and goals."
            nextRoute={"/onboarding/success-explainer"}
        >
            <OnboardingVectorImage vector="StretchingPerson" />
        </OnboardingSlotLayout>
    );
}
