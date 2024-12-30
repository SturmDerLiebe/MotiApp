import { DimensionValue, View } from "react-native";

export function HorizontalSpacer({ height }: { height: DimensionValue }) {
    return <View style={{ height: height }} />;
}
