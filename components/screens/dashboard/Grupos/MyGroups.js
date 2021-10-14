import React from "react";
import {  View, Text, ScrollView } from "react-native";
import Styles from "../../../../resources/styles/Dashboard";
import Navigation from "../Grupos/Navigation/Navigation";
import { NavigationContainer } from '@react-navigation/native';
const MyGroupsScreen = (route) => {
    const { navigation } = route;

    return(
        <NavigationContainer independent={true}>
        <Navigation></Navigation>
        </NavigationContainer>
        );
}

export default MyGroupsScreen;