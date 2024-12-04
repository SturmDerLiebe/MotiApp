import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Icon, Icons } from "@/constants/Icons";
import { Tabs } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { BurgerMenuButton } from "@/components/navigation/BurgerMenuButton";

const HEADER_TINT_COLOR = Colors.white;
const HEADER_BORDER_RADIUS = 20;
const TAB_BAR_BACKGROUND_COLOR = Colors.grey.light1;

export default function TabLayout() {
  const USER_DATA = { groupName: "Avengers" };
  NavigationBar.setBackgroundColorAsync(TAB_BAR_BACKGROUND_COLOR);

  return (
    <Tabs
      tabBar={function renderTabBar(bottomTabBarProps) {
        return (
          <MainTabBar
            iconSize={32}
            backgroundColor={TAB_BAR_BACKGROUND_COLOR}
            tabBarStyle={{ height: "7%", elevation: 0 }}
            {...bottomTabBarProps}
          />
        );

        // NOTE: TS types of bottomTabBarProps are not exported properly. Leave this component in this scope to make use of `typeof`.

        //#region MAIN TAB BAR COMPONENT

        type TabName = "index" | "group" | "profile";

        /**
         * Mostly copied from [React Native Navigation Docs](https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar)
         *
         * **Important**: Make sure to that `tabBarLabel` is of type `string`
         */
        function MainTabBar(
          props: typeof bottomTabBarProps & {
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
                source={require("@/assets/images/optimized_svg/CurvedBottomNavBackground.svg")} //TODO: This svg is to high. Crop bottom from to curviture
              />
              {state.routes.map((route, index) => {
                //#region RENDER TAB BUTTONS

                //TODO: CONTINUE REFACTOR MORE
                const { options } = descriptors[route.key];
                const LABEL = options.tabBarLabel;

                const IS_FOCUSED = state.index === index;
                const BUTTON_COLOR =
                  (IS_FOCUSED
                    ? options.tabBarActiveTintColor
                    : options.tabBarInactiveTintColor) ?? Colors.blue.grey;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={IS_FOCUSED ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={[
                      { flex: 1 },
                      showCurvedTabBar(index)
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
                    <GroupIcon index={index} />

                    {typeof LABEL === "string" && !showCurvedTabBar(index) ? (
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
                    ) : null}
                  </Pressable>
                );

                function GroupIcon({ index }: { index: number }) {
                  return showCurvedTabBar(index) ? (
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
                  );
                }

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

                function onPress() {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!IS_FOCUSED && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }

                function onLongPress() {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  });
                }
                //#endregion
              })}
            </View>
          );

          function indexOfGroup() {
            return state.routes.findIndex(
              (route) => (route.name as TabName) === "group",
            );
          }

          function isGroupFocused() {
            return state.index === indexOfGroup();
          }

          function showCurvedTabBar(index: number) {
            return index === indexOfGroup() && isGroupFocused();
          }
          //#endregion
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
