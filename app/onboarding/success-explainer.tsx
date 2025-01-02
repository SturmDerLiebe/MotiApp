import {
    OnboardingSlotLayout,
    OnboardingVectorImage,
} from "@/components/onboarding/OnboardingComponents";

export default function SuccessExplainerScreen() {
    return (
        <OnboardingSlotLayout
            title="Share Your Success"
            paragraph="Share your workout photos as a proof with friends in your group. Every time you send a picture, your progress bar is updated"
            nextRoute={"/onboarding/penalty-explainer"}
        >
            <OnboardingVectorImage vector="TriumphCupPeople" />
        </OnboardingSlotLayout>
    );
}
