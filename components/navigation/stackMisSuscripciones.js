import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IndexScreen from "../screens/dashboard/MisSuscripciones";
import GroupScreen from "./tabGrupos";

const Stack = createStackNavigator();

const MainSuscripciones = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                })}
                initialRouteName="index"
            >
                <Stack.Screen
                    name="index"
                    component={IndexScreen}
                    options={{ title: "TecnoBooth" }}
                />
                <Stack.Screen
                    name="grupos"
                    component={GroupScreen}
                    options={{ title: "TecnoBooth" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainSuscripciones;
