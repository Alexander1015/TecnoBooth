import React from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../../resources/styles/styleDashboard";
import Navigation from "./Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
const MyGroupsScreen = (route) => {
    const { navigation } = route;

    return (
        <NavigationContainer independent={true}>
            <Navigation></Navigation>
        </NavigationContainer>
    );
};

export default MyGroupsScreen;
