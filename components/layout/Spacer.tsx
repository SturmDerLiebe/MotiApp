import { DimensionValue, View } from "react-native";

/**
 * A Horizontal Spacer getting its height from a flex number
 */
export function HorizontalSpacer(props: { flex: number }): React.JSX.Element;
/**
 * A Horizontal Spacer getting its height from a {@link DimensionValue}
 */
export function HorizontalSpacer(props: {
    height: DimensionValue;
}): React.JSX.Element;
export function HorizontalSpacer(props: {
    height?: DimensionValue;
    flex?: number;
}): React.JSX.Element {
    return props.flex !== undefined ? (
        <View style={{ flex: props.flex }} />
    ) : (
        <View style={{ height: props.height }} />
    );
}
