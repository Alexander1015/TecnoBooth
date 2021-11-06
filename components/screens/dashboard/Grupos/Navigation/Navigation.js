import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import InfoStack from "./stackInfo";
import HomeStack from "./stackHome";
import IntegStack from "./stackInteg";

const Tab = createBottomTabNavigator();

const Navigation = ({ route, navigation }) => {
  //Dato de prueba
  const [idgrupo, setIdGrupo] = useState("MUutMUnTx8tWEGLvqrIc");
  
  //const { idgrupo } = route.params;

  const HomeScreen = () => {
    return <HomeStack idgrupo={idgrupo} />;
  };

  const InfoScreen = () => {
    return <InfoStack idgrupo={idgrupo} />;
  };

  const IntegScreen = () => {
    return <IntegStack idgrupo={idgrupo} />;
  };
  

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Información" component={InfoScreen} />
      <Tab.Screen name="Integrantes" component={IntegScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;