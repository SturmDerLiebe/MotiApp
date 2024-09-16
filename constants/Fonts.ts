import { StyleProp, TextStyle } from "react-native";

const h5: StyleProp<TextStyle> = {
  fontSize: 28,
  fontWeight: "bold",
  lineHeight: 28,
};

const p4: StyleProp<TextStyle> = {
  fontSize: 16,
  fontWeight: "regular",
};

const p5: StyleProp<TextStyle> = {
  fontSize: 14,
  fontWeight: "regular",
};

const p8: StyleProp<TextStyle> = {
  fontSize: 12,
  fontWeight: "regular",
};

const p9: StyleProp<TextStyle> = {
  fontSize: 12,
  fontWeight: 500,
};

export const Fonts = {
  title: {
    h5,
  },
  paragraph: {
    p9,
    p8,
    p5,
    p4,
  },
};
