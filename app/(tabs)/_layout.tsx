import { BurgerMenuButton } from "@/components/navigation/BurgerMenuButton";
import { MainTabBar } from "@/components/navigation/TabBar/MainTabBar";
import { TabBarStyles } from "@/components/navigation/TabBar/Styles";
import { MotiColors } from "@/constants/Colors";
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
import { Tabs, router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";

/** This type is to be used for components relying on the `name` of all our `Tabs.Screen`-elements of the main tab navigation */
export type TabName = "index" | "group" | "profile" | "camera";

const HEADER_TINT_COLOR = MotiColors.white;
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
    useFocusEffect(
        useCallback(() => {
            NavigationBar.setBackgroundColorAsync(TabBarStyles.backgroundColor);
        }, []),
    );

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
                    headerTitle: "",
                    headerShadowVisible: false,
                    sceneStyle: { backgroundColor: MotiColors.white },
                    tabBarActiveTintColor: MotiColors.blue.grey,
                    tabBarInactiveTintColor: MotiColors.grey.dark2,
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
                            backgroundColor: MotiColors.eggplant.dark,
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
                                    ? userInfoState.groupInfo.groupName
                                    : "Loading"}
                            </Text>
                        ),
                        headerTitleAlign: "left",

                        headerRight: ({ tintColor = HEADER_TINT_COLOR }) => (
                            <View style={{ paddingRight: 20 }}>
                                <BurgerMenuButton
                                    tintColor={tintColor}
                                    onPress={() => {
                                        router.push("/groupInfo");
                                    }}
                                />
                            </View>
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
                        headerShown: false,
                        sceneStyle: {
                            backgroundColor: MotiColors.black,
                        },
                    }}
                />
            </Tabs>
        </CameraProvider>
    );
}
