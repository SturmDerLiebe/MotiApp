import { BurgerMenuButton } from "@/components/navigation/BurgerMenuButton";
import { MainTabBar } from "@/components/navigation/TabBar/MainTabBar";
import { TabBarStyles } from "@/components/navigation/TabBar/Styles";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { CameraProvider } from "@/hooks/context/CameraContext";
import {
    useControlUserInfoContext,
    useUserInfoContext,
} from "@/hooks/context/UserInfoContext";
import {
    MessagingProvider,
    useControlMessagingContext,
} from "@/hooks/context/message/MessagingContext";
import { UserInfoSuccess } from "@/utils/RequestStatus";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

/** This type is to be used for components relying on the `name` of all our `Tabs.Screen`-elements of the main tab navigation */
export type TabName = "index" | "group" | "profile" | "camera";

const HEADER_TINT_COLOR = Colors.white;
const HEADER_BORDER_RADIUS = 20;

/**
 * This  component just wraps the {@link TabLayout} component with necessary Context CameraProvider
 */
export default function TabContextWrapper() {
    return (
        <MessagingProvider>
            <TabLayout />
        </MessagingProvider>
    );
}

function TabLayout() {
    NavigationBar.setBackgroundColorAsync(TabBarStyles.backgroundColor);
    const userInfoState = useUserInfoContext();

    const [requestUserInfo, cancelUserInfoRequest] =
        useControlUserInfoContext();

    const [startMessaging, cancelMessaging] = useControlMessagingContext();

    useEffect(() => {
        requestUserInfo();
        startMessaging();
        return () => {
            cancelUserInfoRequest();
            cancelMessaging();
        };
    }, [
        requestUserInfo,
        cancelUserInfoRequest,
        startMessaging,
        cancelMessaging,
    ]);

    return (
        <CameraProvider>
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

                <Tabs.Screen
                    name="group"
                    options={{
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
                            <Text
                                style={[{ color: tintColor }, Fonts.title.h6]}
                            >
                                {userInfoState instanceof UserInfoSuccess
                                    ? userInfoState.groupName
                                    : "Loading"}
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

                <Tabs.Screen
                    name="camera"
                    options={{
                        sceneStyle: {
                            backgroundColor: Colors.black,
                        },
                    }}
                />
            </Tabs>
        </CameraProvider>
    );
}
