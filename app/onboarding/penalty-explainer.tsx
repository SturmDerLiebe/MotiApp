import {
    OnboardingSlotLayout,
    OnboardingVectorImage,
} from "@/components/onboarding/OnboardingComponents";

export default function SuccessExplainerScreen() {
    return (
        <OnboardingSlotLayout
            title="Penalty is your motivation!"
            paragraph={`Send 10€ to a trusted member who manages the group fund when you don’t meet your fitness goal.
Use it for a group gathering anytime!`}
            nextRoute={"/authentication"}
        >
            <OnboardingVectorImage vector="JumpingRopePerson" />
        </OnboardingSlotLayout>
    );
}
