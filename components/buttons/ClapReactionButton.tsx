import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export function ClapReactionButton({
    initialCount = 0,
}: {
    initialCount: number;
}) {
    function hasAnyReactions(amount: number) {
        return amount > 0;
    }
    const [count, setCount] = useState(initialCount);

    return (
        <Pressable
            onPress={function () {
                setCount((current) =>
                    count === initialCount ? current + 1 : current - 1,
                );
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
        >
            <ClapReactionIcon anyReactionsYet={hasAnyReactions(count)} />
            <Text style={[Fonts.paragraph.p9, { paddingStart: 4 }]}>
                {hasAnyReactions(count) ? count : null}
            </Text>
        </Pressable>
    );
}

const CLAP_EMOJI = "👏";

function ClapReactionIcon(props: { anyReactionsYet: boolean }) {
    return (
        <View
            style={{
                alignSelf: "center",
                width: 30,
                aspectRatio: 1,

                backgroundColor: Colors.white,
                borderRadius: 100,

                elevation: 3,
                shadowOffset: { width: 0, height: 2.27 },
                shadowColor: "#8D8D8F",
                shadowOpacity: 0.2,

                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    textAlignVertical: "center",

                    opacity: props.anyReactionsYet ? 1 : 0.2,
                }}
            >
                {CLAP_EMOJI}
            </Text>
        </View>
    );
}
