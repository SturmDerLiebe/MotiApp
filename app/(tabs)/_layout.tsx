import { BurgerMenuButton } from "@/components/navigation/BurgerMenuButton";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Icon, Icons } from "@/constants/Icons";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";

const HEADER_TINT_COLOR = Colors.white;
const HEADER_BORDER_RADIUS = 20;
const TAB_BAR_BACKGROUND_COLOR = Colors.grey.light1;
const TAB_BAR_ICON_SIZE = 32;

type TabName = "index" | "group" | "profile";

export default function TabLayout() {
  const USER_DATA = { groupName: "Avengers" };
  NavigationBar.setBackgroundColorAsync(TAB_BAR_BACKGROUND_COLOR);

  return (
    <Tabs
      tabBar={function renderTabBar(bottomTabBarProps) {
        return <MainTabBar {...bottomTabBarProps} />;

        //ISSUE: Having all subcomponents extracted causes Flickering?
        //
        // NOTE: TS types of bottomTabBarProps are not exported properly. Leave this component in this scope to make use of `typeof`.

        /**
         * Mostly copied from [React Native Navigation Docs](https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar)
         *
         * **Important**: Make sure to that `tabBarLabel` is of type `string`
         */
        function MainTabBar(props: typeof bottomTabBarProps) {
          const { state, descriptors, navigation } = props;

          const INDEX_OF_GROUP_TAB = state.routes.findIndex(
            (route) => (route.name as TabName) === "group",
          );
          const IS_GROUP_FOCUSED = state.index === INDEX_OF_GROUP_TAB;

          return (
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
                const BUTTON_COLOR =
                  (IS_TAB_FOCUSED
                    ? tabBarActiveTintColor
                    : tabBarInactiveTintColor) ?? Colors.blue.grey;

                return (
                  <TabBarPressable
                    // Label is not of type ReactNode as of now, therefore we can typecast to string:
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

                  if (!IS_TAB_FOCUSED && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }

                function onLongPress() {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  });
                }
              })}
            </TabBarWrapper>
          );
        }
      }}
      screenOptions={{
        sceneStyle: { backgroundColor: Colors.white },
        headerShown: false,
        tabBarActiveTintColor: Colors.blue.grey,
        tabBarInactiveTintColor: Colors.grey.dark2,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Dashboard",
        }}
      />

      <Tabs.Screen
        name="group"
        options={{
          href: {
            pathname: "/(tabs)/group",
            params: { group: USER_DATA.groupName },
          },

          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.eggplant.dark,
          },
          headerBackgroundContainerStyle: {
            borderEndStartRadius: HEADER_BORDER_RADIUS,
            borderEndEndRadius: HEADER_BORDER_RADIUS,
          },

          headerTintColor: HEADER_TINT_COLOR,

          headerTitle: ({ tintColor }) => (
            <Text style={[{ color: tintColor }, Fonts.title.h6]}>
              {USER_DATA.groupName}
            </Text>
          ),
          headerTitleAlign: "left",

          headerRight: ({ tintColor = HEADER_TINT_COLOR }) => (
            <BurgerMenuButton tintColor={tintColor} />
          ),

          tabBarLabel: "My Group",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "My Profile",
        }}
      />
    </Tabs>
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
            : TAB_BAR_BACKGROUND_COLOR,
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
        backgroundColor: TAB_BAR_BACKGROUND_COLOR,
        justifyContent: "center",
      }}
    >
      <Icon
        tintColor={buttonColor}
        size={TAB_BAR_ICON_SIZE * 1.5}
        icon={determineIcon(routeName, isCameraIcon)}
      />
    </View>
  ) : (
    <Icon
      tintColor={buttonColor}
      size={TAB_BAR_ICON_SIZE}
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
