import { StyleSheet } from "react-native";

const INTER_REGULAR = "Inter_400Regular";
const INTER_MEDIUM = "Inter_500Medium";
const INTER_SEMIBOLD = "Inter_600SemiBold";
const INTER_BOLD = "Inter_700Bold";
const SPACE_MONO_REGULAR = "SpaceMono_400Regular";
const SPACE_MONO_BOLD = "SpaceMono_700Bold";

export const Fonts = {
  digits: StyleSheet.create({
    extra: { fontSize: 100, fontFamily: SPACE_MONO_BOLD },

    big: { fontSize: 48, fontFamily: SPACE_MONO_REGULAR },

    medium: { fontSize: 48, fontFamily: SPACE_MONO_REGULAR },
  }),
  title: {
    h2: { fontSize: 48, lineHeight: 28, fontFamily: INTER_MEDIUM },
    h5: { fontSize: 28, lineHeight: 48, fontFamily: INTER_BOLD },
    h6: { fontSize: 28, lineHeight: 28, fontFamily: INTER_SEMIBOLD },
  },
  paragraph: {
    p1: { fontSize: 16, fontFamily: INTER_BOLD },
    p2: { fontSize: 16, fontFamily: INTER_SEMIBOLD },
    p4: { fontSize: 16, fontFamily: INTER_REGULAR },
    p5: { fontSize: 14, fontFamily: INTER_REGULAR },
    p6: { fontSize: 14, fontFamily: INTER_MEDIUM },
    p7: { fontSize: 14, fontFamily: INTER_BOLD },
    p8: { fontSize: 12, fontFamily: INTER_REGULAR },
    p9: { fontSize: 12, fontFamily: INTER_MEDIUM },
    p10: { fontSize: 10, fontFamily: INTER_REGULAR },
  },
};
