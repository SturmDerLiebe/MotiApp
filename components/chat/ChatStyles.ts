import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const MESSAGE_BORDER_RADIUS = 10;
export const CHAT_STYLES = StyleSheet.create({
  screenContainer: {
    alignSelf: "center",
    width: "90%",
    height: "93%",
  },
  messageContainer: {
    flexDirection: "row",
  },
  avatar: {
    alignSelf: "flex-end",
    borderRadius: 100,
    width: 30,
    aspectRatio: 1,
  },
  bodyBase: {
    flex: 1,
    backgroundColor: Colors.grey.light2,
    borderRadius: MESSAGE_BORDER_RADIUS,
    paddingTop: 4,
    paddingStart: 12,
  },
  headerAndMainContainer: {
    paddingBottom: 8,
  },
  time: {
    position: "absolute",
    end: 8,
    bottom: 4,

    color: Colors.grey.dark3,
  },
  clapReactionContainer: {
    width: "15%",
    justifyContent: "center",
    paddingStart: 10,
  },
  image: {
    borderRadius: MESSAGE_BORDER_RADIUS,
    width: 140,
    height: 184,
    alignSelf: "flex-start",
  },
  date: {
    alignSelf: "center",
    textAlign: "center",

    backgroundColor: Colors.grey.dark3,
    color: Colors.white,

    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  divider: { height: 12 },
});
