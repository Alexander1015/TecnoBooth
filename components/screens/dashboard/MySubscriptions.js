import React from "react";
import {  View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Dashboard";

const MySuscriptionsScreen = (route) => {
    const { navigation } = route;

    return(
        <View style={ Styles.container }>
            <ScrollView vertical>
                <Text style={ Styles.texto }>Estamos en Dashboard</Text>
                <Text style={ Styles.texto }>Soy Mis Suscripciones</Text>
            </ScrollView>
        </View>
    );
}

export default MySuscriptionsScreen;