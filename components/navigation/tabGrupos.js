import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/dashboard/Grupos/Home";
import InfoScreen from "../screens/dashboard/Grupos/Info";
import IntegScreen from "../screens/dashboard/Grupos/Integ";
import Load from "../Load";

const Tab = createBottomTabNavigator();

const MainGrupos = ({ route, navigation }) => {
  const { idgrupo } = route.params;

  const Home = () => {
    return <HomeScreen idgrupo={idgrupo} />;
  };

  const Info = () => {
    return <InfoScreen idgrupo={idgrupo} />;
  };

  const Integ = () => {
    return <IntegScreen idgrupo={idgrupo} />;
  };

  if (idgrupo) {
    return (
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;

            if (route.name === "home") {
              iconName = focused ? "home" : "home";
              iconColor = focused ? "#041F2E" : "gray";
            } else if (route.name === "info") {
              iconName = focused ? "info-circle" : "info-circle";
              iconColor = focused ? "#041F2E" : "gray";
            } else if (route.name === "integ") {
              iconName = focused ? "users" : "users";
              iconColor = focused ? "#041F2E" : "gray";
            }
            return (
              <FontAwesome5 name={iconName} size={size} color={iconColor} />
            );
          },
          tabBarActiveTintColor: "#041F2E",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="home" component={Home} options={{ title: "Home" }} />
        <Tab.Screen
          name="info"
          component={Info}
          options={{ title: "Información" }}
        />
        <Tab.Screen
          name="integ"
          component={Integ}
          options={{ title: "Integrantes" }}
        />
      </Tab.Navigator>
    );
  } else {
    navigation.navigate("index");

    return <Load />;
  }
};

export default MainGrupos;
