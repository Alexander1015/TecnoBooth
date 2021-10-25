import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../../database/firebase";
import PublicNav from "./drawerPublic";
import DashboardNav from "./drawerDashboard";

const Stack = createStackNavigator();

const Navigation = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = firebase.auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                })}
                initialRouteName={() => {
                    if (!user) return "public";
                    else return "dashboard";
                }}
            >
                <Stack.Screen
                    name="public"
                    component={PublicNav}
                    options={{ title: "TecnoBooth" }}
                />
                <Stack.Screen
                    name="dashboard"
                    component={DashboardNav}
                    options={{ title: "TecnoBooth" }}
                />
            </Stack.Navigator>
        </>
    );
};

export default Navigation;
