import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Public";

const AuthScreen = (route) => {
    const { navigation } = route;

    return(
        <View style={ Styles.container }>
            <ScrollView vertical>
                <Text style={ Styles.texto }>Estamos en Public</Text>
                <Text style={ Styles.texto }>Soy Auth</Text>
                <TouchableOpacity
                    style={ Styles.btngoto }
                    onPress={() => navigation.navigate("register")}
                >
                    <Text style={ Styles.txtgoto }>Ir a Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ Styles.btngoto }
                    onPress={() => navigation.navigate("dashboard")}
                >
                    <Text style={ Styles.txtgoto }>Ir a Dashboard</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default AuthScreen;