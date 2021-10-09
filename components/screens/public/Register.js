import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Public";

const RegisterScreen = (route) => {
    const { navigation } = route;

    return(
        <View style={ Styles.container }>
            <ScrollView vertical>
                <Text style={ Styles.texto }>Estamos en Public</Text>
                <Text style={ Styles.texto }>Soy Register</Text>
                <TouchableOpacity
                    style={ Styles.btngoto }
                    onPress={() => navigation.navigate("auth")}
                >
                    <Text style={ Styles.txtgoto }>Ir a Auth</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default RegisterScreen;