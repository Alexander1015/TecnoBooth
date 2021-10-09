import React from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Dashboard";

const SettingScreen = (route) => {
    const { navigation } = route;

    return(
        <View style={ Styles.container }>
            <ScrollView vertical>
                <Text style={ Styles.texto }>Estamos en Dashboard</Text>
                <Text style={ Styles.texto }>Soy Ajustes</Text>
            </ScrollView>
        </View>
    );
}

export default SettingScreen;