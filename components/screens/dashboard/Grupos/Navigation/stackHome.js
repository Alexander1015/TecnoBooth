import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
const Stack = createStackNavigator();
export default function HomeStack(props) {
    const { idgrupo } = props;

    const HomeScreen = () => {
        return <Home idgrupo={idgrupo} />;
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Home", headerShown: false }}
            />
        </Stack.Navigator>
    );
}
