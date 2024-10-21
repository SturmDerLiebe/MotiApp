import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Icon, Icons } from "@/constants/Icons";
import { Tabs } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";

const TAB_BAR_BACKGROUND_COLOR = Colors.grey.light1;

export default function TabLayout() {
  NavigationBar.setBackgroundColorAsync(TAB_BAR_BACKGROUND_COLOR);

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: Colors.white }}
      tabBar={(bottomTabBarProps) => (
        <MainTabBar
          iconSize={32}
          backgroundColor={TAB_BAR_BACKGROUND_COLOR}
          tabBarStyle={{ height: "7%", elevation: 0 }}
          {...bottomTabBarProps}
        />
      )}
      screenOptions={{
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

type TabName = "index" | "group" | "profile";

/**
 * Mostly copied from [React Native Navigation Docs](https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar)
 */
function MainTabBar(
  props: BottomTabBarProps & {
    iconSize: number;
    backgroundColor: string;
    tabBarStyle: ViewStyle;
  },
) {
  const {
    state,
    descriptors,
    navigation,
    iconSize,
    backgroundColor,
    tabBarStyle,
  } = props;

  function indexOfGroup() {
    return state.routes.findIndex(
      (route) => (route.name as TabName) === "group",
    );
  }

  function isGroupFocused() {
    return state.index === indexOfGroup();
  }

  return (
    <View
      style={[
        tabBarStyle,
        {
          flexDirection: "row",
          backgroundColor: isGroupFocused()
            ? Colors.transparent
            : backgroundColor,
          paddingTop: 5,
        },
      ]}
    >
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          aspectRatio: 4.43,
          tintColor: Colors.grey.light1,
        }}
        source={require("@/assets/images/optimized_svg/CurvedBottomNavBackground.svg")} //TODO: This svg his to high. Crop bottom from to curviture
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const LABEL = options.tabBarLabel;

        const IS_FOCUSED = state.index === index;
        const BUTTON_COLOR =
          (IS_FOCUSED
            ? options.tabBarActiveTintColor
            : options.tabBarInactiveTintColor) ?? Colors.blue.grey;

        function determineIcon(): keyof typeof Icons {
          switch (route.name as TabName) {
            case "index":
              return "Dashboard";
            case "group":
              return IS_FOCUSED ? "Camera" : "Chat";
            case "profile":
              return "Profile";
            default:
              throw new Error(
                `Tab ${route.name} does not exist in the current TabNavigator`,
              );
          }
        }

        function showCurvedTabBar() {
          return index === indexOfGroup() && isGroupFocused();
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!IS_FOCUSED && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={IS_FOCUSED ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              { flex: 1 },
              showCurvedTabBar()
                ? {
                    borderRadius: 100,
                    position: "relative",
                    bottom: "6%",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : null,
            ]}
            key={route.key}
          >
            {showCurvedTabBar() ? (
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
                  tintColor={BUTTON_COLOR}
                  size={iconSize * 1.5}
                  icon={determineIcon()}
                />
              </View>
            ) : (
              <Icon
                tintColor={BUTTON_COLOR}
                size={iconSize}
                icon={determineIcon()}
              />
            )}

            {typeof LABEL === "string" && !showCurvedTabBar() ? (
              <Text
                style={[
                  Fonts.paragraph.p10,
                  {
                    color: BUTTON_COLOR,
                    textAlign: "center",
                  },
                ]}
              >
                {LABEL}
              </Text>
            ) : showCurvedTabBar() ? null : (
              (function () {
                console.warn(
                  "Your prop 'tabBarLabel' was not a string and is ignored. Please pass a string instead. It will be hidden on focus automatically",
                );
                return null;
              })()
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
