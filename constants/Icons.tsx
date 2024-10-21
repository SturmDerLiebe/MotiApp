import { Image } from "expo-image";

export function Icon(props: {
  tintColor: string;
  size: number;
  icon: keyof typeof Icons;
}) {
  const { tintColor, icon } = props;
  return (
    <Image
      contentFit="contain"
      style={{
        tintColor,
        width: props.size,
        aspectRatio: 1,
        alignSelf: "center",
      }}
      source={Icons[icon]}
    />
  );
}

export const Icons = {
  Dashboard: require("@/assets/images/optimized_svg/DashboardIcon.svg"),
  Chat: require("@/assets/images/optimized_svg/ChatIcon.svg"),
  Profile: require("@/assets/images/optimized_svg/ProfileIcon.svg"),
  Camera: require("@/assets/images/optimized_svg/CameraIcon.svg"),
};
