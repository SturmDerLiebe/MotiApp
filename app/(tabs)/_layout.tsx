import { BurgerMenuButton } from "@/components/navigation/BurgerMenuButton";
import { MainTabBar } from "@/components/navigation/TabBar/MainTabBar";
import { TabBarStyles } from "@/components/navigation/TabBar/Styles";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { Text } from "react-native";

const HEADER_TINT_COLOR = Colors.white;
const HEADER_BORDER_RADIUS = 20;

// TODO: Read from UserInfo response instead
const USER_DATA = { groupName: "Avengers" };

export default function TabLayout() {
  NavigationBar.setBackgroundColorAsync(TabBarStyles.backgroundColor);

  return (
    <Tabs
      tabBar={function renderTabBar(bottomTabBarProps) {
        return <MainTabBar {...bottomTabBarProps} />;
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

      <GroupTab groupName={USER_DATA.groupName} />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "My Profile",
        }}
      />
    </Tabs>
  );
}

function GroupTab({ groupName }: { groupName: string }) {
  return (
    <Tabs.Screen
      name="group"
      options={{
        href: {
          pathname: "/(tabs)/group",
          params: { group: groupName },
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
            {groupName}
          </Text>
        ),
        headerTitleAlign: "left",

        headerRight: ({ tintColor = HEADER_TINT_COLOR }) => (
          <BurgerMenuButton tintColor={tintColor} />
        ),

        tabBarLabel: "My Group",
      }}
    />
  );
}
