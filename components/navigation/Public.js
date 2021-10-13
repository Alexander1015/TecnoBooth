import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/public/Auth";
import RegisterScreen from "../screens/public/Register";
import ForgetScreen from "../screens/public/Forget";

const Stack = createStackNavigator();

const PublicNav = () => {
    return(
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
            initialRouteName="auth"
        >
            <Stack.Screen name="auth" component={AuthScreen} options={{ title: "TecnoBooth" }} />
            <Stack.Screen name="register" component={RegisterScreen} options={{ title: "TecnoBooth" }} />
            <Stack.Screen name="forget" component={ForgetScreen} options={{ title: "TecnoBooth" }} />
        </Stack.Navigator>
    )
}

export default PublicNav;