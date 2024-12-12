import { TabName } from "@/app/(tabs)/_layout";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Icon, Icons } from "@/constants/Icons";
import {
    NavigationRoute,
    ParamListBase,
    TabNavigationState,
} from "@react-navigation/native";
import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { TabBarStyles } from "./Styles";
import { PermissionResponse, useCameraPermissions } from "expo-camera";
import { useCameraDispatchContext } from "@/hooks/context/CameraContext";

/**
 * Mostly copied from [React Native Navigation Docs](https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar)
 *
 * **Important**: Make sure to that `tabBarLabel` is of type `string`
 */
export function MainTabBar({
    state,
    descriptors,
    navigation,
}: {
    state: TabNavigationState<ParamListBase>;
    // NOTE: TS types of external BottomTabBarProps are not exported properly which justifies the use of `any` here
    descriptors: any;
    navigation: any;
}) {
    function getTabName(
        route: NavigationRoute<ParamListBase, string>,
    ): TabName {
        // NOTE: We can assume the only options of `route.name` to be of `TabName`
        return route.name as TabName;
    }

    function findIndexOfTab(
        state: TabNavigationState<ParamListBase>,
        tabName: TabName,
    ): number {
        return state.routes.findIndex((route) => getTabName(route) === tabName);
    }

    const IS_CAMERA_FOCUSED = state.index === findIndexOfTab(state, "camera");
    const IS_GROUP_FOCUSED = state.index === findIndexOfTab(state, "group");

    const [permission, requestPermission] = useCameraPermissions();
    const dispatchCameraState = useCameraDispatchContext();

    return IS_CAMERA_FOCUSED ? null : (
        <TabBarWrapper isGroupFocused={IS_GROUP_FOCUSED}>
            {state.routes.map((route, index) => {
                const {
                    options: {
                        tabBarActiveTintColor,
                        tabBarInactiveTintColor,
                        tabBarLabel,
                        tabBarAccessibilityLabel,
                    },
                } = descriptors[route.key];

                const IS_TAB_FOCUSED = state.index === index;
                const IS_CAMERA = findIndexOfTab(state, "camera") === index;
                const BUTTON_COLOR =
                    (IS_TAB_FOCUSED
                        ? tabBarActiveTintColor
                        : tabBarInactiveTintColor) ?? Colors.blue.grey;

                return IS_CAMERA ? null : (
                    <TabBarPressable
                        // NOTE: Label is not of type ReactNode as of now, therefore we can typecast to string:
                        label={tabBarLabel as string}
                        accessibilityLabel={tabBarAccessibilityLabel}
                        buttonColor={BUTTON_COLOR}
                        isCurrentTabFocused={IS_TAB_FOCUSED}
                        isGroupTabFocused={IS_GROUP_FOCUSED}
                        routeName={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                    />
                );

                function onPress() {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (event.defaultPrevented) {
                        return;
                    }

                    if (!IS_TAB_FOCUSED) {
                        navigation.navigate(route.name, route.params);
                        return;
                    }

                    if (IS_GROUP_FOCUSED) {
                        handleCameraPermission(permission, navigation);
                        return;
                    }
                }

                function onLongPress() {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                }

                function handleCameraPermission(
                    permission: PermissionResponse | null,
                    navigation: any,
                ) {
                    if (permission?.granted) {
                        dispatchCameraState({ type: "EnableCamera" });
                        navigation.navigate("camera");
                    } else {
                        //TODO: Request UI for Permission
                        requestPermission();
                    }
                }
            })}
        </TabBarWrapper>
    );
}

function TabBarWrapper({
    isGroupFocused,
    children,
}: PropsWithChildren<{
    isGroupFocused: boolean;
}>) {
    return (
        <View
            style={[
                {
                    height: "7%",
                    elevation: 0,
                    flexDirection: "row",
                    backgroundColor: isGroupFocused
                        ? Colors.transparent
                        : TabBarStyles.backgroundColor,
                    paddingTop: 5,
                },
            ]}
        >
            <Image
                style={{
                    position: "absolute",
                    width: "100%",
                    aspectRatio: 4.43,
                    tintColor: Colors.grey.light1,
                }}
                source={require("@/assets/images/optimized_svg/CurvedBottomNavBackground.svg")}
            />
            {children}
        </View>
    );
}

function TabBarPressable({
    label,
    accessibilityLabel,
    buttonColor,
    isCurrentTabFocused,
    isGroupTabFocused,
    routeName,
    onPress,
    onLongPress,
}: {
    label: string;
    accessibilityLabel?: string;
    buttonColor: string;
    isCurrentTabFocused: boolean;
    isGroupTabFocused: boolean;
    routeName: string;
    onPress: () => void;
    onLongPress: () => void;
    key: React.Key;
}) {
    const IS_FOCUSED_GROUP_TAB = isCurrentTabFocused && isGroupTabFocused;
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={isCurrentTabFocused ? { selected: true } : {}}
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
                { flex: 1 },
                IS_FOCUSED_GROUP_TAB
                    ? {
                          borderRadius: 100,
                          position: "relative",
                          bottom: "35%",
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                      }
                    : null,
            ]}
        >
            <GroupIcon
                buttonColor={buttonColor}
                isCameraIcon={IS_FOCUSED_GROUP_TAB}
                routeName={routeName as TabName}
            />

            {!IS_FOCUSED_GROUP_TAB ? (
                <Text
                    style={[
                        Fonts.paragraph.p10,
                        {
                            color: buttonColor,
                            textAlign: "center",
                        },
                    ]}
                >
                    {label}
                </Text>
            ) : null}
        </Pressable>
    );
}

function GroupIcon({
    buttonColor,
    isCameraIcon,
    routeName,
}: {
    buttonColor: string;
    isCameraIcon: boolean;
    routeName: TabName;
}) {
    return isCameraIcon ? (
        <View
            style={{
                width: "65%",
                aspectRatio: 1,
                borderRadius: 100,
                backgroundColor: TabBarStyles.backgroundColor,
                justifyContent: "center",
            }}
        >
            <Icon
                tintColor={buttonColor}
                size={TabBarStyles.iconSize * 1.5}
                icon={determineIcon(routeName, isCameraIcon)}
            />
        </View>
    ) : (
        <Icon
            tintColor={buttonColor}
            size={TabBarStyles.iconSize}
            icon={determineIcon(routeName, isCameraIcon)}
        />
    );
}

function determineIcon(
    routeName: TabName,
    isFocused: boolean,
): keyof typeof Icons {
    switch (routeName) {
        case "index":
            return "Dashboard";
        case "group":
            return isFocused ? "Camera" : "Chat";
        case "profile":
            return "Profile";
        default:
            throw new Error(
                `Tab ${routeName} does not exist in the current TabNavigator`,
            );
    }
}
