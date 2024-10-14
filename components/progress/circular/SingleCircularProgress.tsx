import { Colors } from "@/constants/Colors";
import { DimensionValue } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

/**
 * @param progress - the progress as a **Decimal Number**
 */
export function SingleCircularProgress(props: {
  progress: number;
  width: DimensionValue;
}) {
  const { width, progress } = props;

  const LENGTH = 100;
  const MIDDLE = 100 / 2;

  const STROKE_PERCENTAGE = 0.1;
  const STROKE_WIDTH = STROKE_PERCENTAGE * LENGTH;

  const INNER_PERCENTAGE = 1 - STROKE_PERCENTAGE;
  const RADIUS = (LENGTH * INNER_PERCENTAGE) / 2;
  const CIRCUMFRENCE = 2 * Math.PI * RADIUS;

  return (
    <Svg
      style={{ width, aspectRatio: 1, zIndex: -1, position: "absolute" }}
      viewBox={`0 0 ${LENGTH} ${LENGTH}`}
    >
      <G fill="none" strokeLinecap="round" strokeWidth={STROKE_WIDTH}>
        <Circle
          cx={MIDDLE}
          cy={MIDDLE}
          r={RADIUS}
          stroke={Colors.orange.light}
        />
        <Circle
          cx={MIDDLE}
          cy={MIDDLE}
          r={RADIUS}
          stroke={Colors.orange.dark}
          strokeDasharray={CIRCUMFRENCE}
          strokeDashoffset={(1 - progress) * CIRCUMFRENCE}
          transform={`rotate(-90, ${MIDDLE}, ${MIDDLE})`}
        />
      </G>
    </Svg>
  );
}
