import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PublicNav from "./Public";
import DashboardNav from "./Dashboard";

const Stack = createStackNavigator();

const Navigation = () => {
    return(
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
            initialRouteName="public"
        >
            <Stack.Screen name="public" component={PublicNav} options={{ title: "TecnoBooth" }} />
            <Stack.Screen name="dashboard" component={DashboardNav} options={{ title: "TecnoBooth" }} />
        </Stack.Navigator>
    )
}

export default Navigation;