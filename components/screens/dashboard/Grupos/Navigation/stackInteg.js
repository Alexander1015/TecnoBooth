import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Integ from "../screens/Integ";
const Stack = createStackNavigator();
export default function IntegStack(props) {
    const { idgrupo } = props;

    const IntegScreen = () => {
        return <Integ idgrupo={idgrupo} />;
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Integ"
                component={IntegScreen}
                options={{ title: "Integ", headerShown: false }}
            />
        </Stack.Navigator>
    );
}
