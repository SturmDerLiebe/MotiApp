import { StyleProp, StyleSheet, TextStyle } from "react-native";

const INTER_REGULAR = "Inter_400Regular";
const INTER_MEDIUM = "Inter_500Medium";
const INTER_SEMIBOLD = "Inter_600SemiBold";
const INTER_BOLD = "Inter_700Bold";
const SPACE_MONO_REGULAR = "SpaceMono_400Regular";
const SPACE_MONO_BOLD = "SpaceMono_700Bold";

const h2: StyleProp<TextStyle> = {
  fontSize: 48,
  lineHeight: 28,
  fontFamily: INTER_MEDIUM,
};

const h5: StyleProp<TextStyle> = {
  fontSize: 28,
  lineHeight: 48,
  fontFamily: INTER_BOLD,
};

const p1: StyleProp<TextStyle> = {
  fontSize: 16,
  fontFamily: INTER_BOLD,
};

const p2: StyleProp<TextStyle> = {
  fontSize: 16,
  fontFamily: INTER_SEMIBOLD,
};

const p4: StyleProp<TextStyle> = {
  fontSize: 16,
  fontFamily: INTER_REGULAR,
};

const p5: StyleProp<TextStyle> = {
  fontSize: 14,
  fontFamily: INTER_REGULAR,
};

const p6: StyleProp<TextStyle> = {
  fontSize: 14,
  fontFamily: INTER_MEDIUM,
};

const p7: StyleProp<TextStyle> = {
  fontSize: 14,
  fontFamily: INTER_BOLD,
};

const p8: StyleProp<TextStyle> = {
  fontSize: 12,
  fontFamily: INTER_REGULAR,
};

const p9: StyleProp<TextStyle> = {
  fontSize: 12,
  fontFamily: INTER_MEDIUM,
};

export const Fonts = {
  digits: StyleSheet.create({
    extra: {
      fontSize: 100,
      fontFamily: SPACE_MONO_BOLD,
    },

    big: {
      fontSize: 48,
      fontFamily: SPACE_MONO_REGULAR,
    },

    medium: {
      fontSize: 48,
      fontFamily: SPACE_MONO_REGULAR,
    },
  }),
  title: {
    h5,
    h2,
  },
  paragraph: {
    p9,
    p8,
    p7,
    p6,
    p5,
    p4,
    p2,
    p1,
  },
};
