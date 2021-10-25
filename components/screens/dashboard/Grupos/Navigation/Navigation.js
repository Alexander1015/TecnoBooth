import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InfoStack from "./stackInfo";
import HomeStack from "./stackHome";
import IntegStack from "./stackInteg";

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Información"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            iconColor = focused ? "#041F2E" : "gray";
          } else if (route.name === "Información") {
            iconName = focused ? "info-circle" : "info-circle";
            iconColor = focused ? "#041F2E" : "gray";
          } else {
            iconName = focused ? "users" : "users";
            iconColor = focused ? "#041F2E" : "gray";
          }
          return <FontAwesome5 name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: "#041F2E",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Información" component={InfoStack} />
      <Tab.Screen name="Integrantes" component={IntegStack} />
    </Tab.Navigator>
  );
}
