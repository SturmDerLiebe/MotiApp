import { PrimaryButton } from "@/components/Buttons";
import { Heading5 } from "@/components/Headings";
import { HorizontalSpacer } from "@/components/layout/Spacer";
import { Paragraph3 } from "@/components/text/paragraph";
import { BitmapNames, Bitmaps } from "@/constants/Bitmaps";
import { VectorNames, Vectorgraphics } from "@/constants/Vectorgraphics";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export function OnboardingSlotLayout({
    title,
    paragraph,
    nextRoute,
    children,
}: PropsWithChildren<{
    title: string;
    paragraph: string;
    nextRoute: Href;
}>) {
    return (
        <View style={{ flex: 1 }}>
            {children}
            <View style={{ flex: 1, paddingHorizontal: "8%" }}>
                <HorizontalSpacer height="9%" />
                <Heading5 style={{ textAlign: "left" }}>{title}</Heading5>

                <HorizontalSpacer height="4%" />
                <Paragraph3>{paragraph}</Paragraph3>

                <HorizontalSpacer flex={1} />
                <PrimaryButton
                    buttonStyle={{ alignSelf: "stretch", paddingVertical: 6 }}
                    iconData={{
                        name: "LeftArrow",
                        size: 34,
                        ariaLabel: "Continue",
                    }}
                    onPress={() => {
                        router.push(nextRoute);
                    }}
                />
            </View>
            <HorizontalSpacer height="5%" />
        </View>
    );
}

export function OnboardingBitmapImage({ bitmap }: { bitmap: BitmapNames }) {
    return (
        <Image
            source={Bitmaps[bitmap]}
            style={{ width: "100%", aspectRatio: 0.9 }}
        />
    );
}

export function OnboardingVectorImage({ vector }: { vector: VectorNames }) {
    return (
        <Image
            source={Vectorgraphics[vector]}
            style={{ width: "100%", aspectRatio: 1 }}
        />
    );
}
