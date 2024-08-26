import FontAwesome from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="space-dashboard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "My Group",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="chat-bubble" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
