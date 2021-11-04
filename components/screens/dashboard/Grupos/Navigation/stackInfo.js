import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Info from "../screens/Info";
const Stack = createStackNavigator();
export default function InfoStack(props) {
    const { idgrupo } = props;

    const InfoScreen = () => {
        return <Info idgrupo={idgrupo} />;
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Info"
                component={InfoScreen}
                options={{ title: "Info", headerShown: false }}
            />
        </Stack.Navigator>
    );
}
