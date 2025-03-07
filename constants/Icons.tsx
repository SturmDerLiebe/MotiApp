import { Image } from "expo-image";

export type IconName = keyof typeof Icons;

export function Icon(props: {
    tintColor: string;
    size: number;
    icon: IconName;
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
    BurgerMenu: require("@/assets/images/optimized_svg/BurgerMenu.svg"),
    BurgerMenuWithBackground: require("@/assets/images/optimized_svg/BurgerMenuWithBackground.svg"),
    Exit: require("@/assets/images/optimized_svg/Exit.svg"),
    LeftArrow: require("@/assets/images/optimized_svg/LeftArrow.svg"),
};

export const MockIcons = {
    Circle: require("@/assets/images/mock_svg/Circle.svg"),
};
