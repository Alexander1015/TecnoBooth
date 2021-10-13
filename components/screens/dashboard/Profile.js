import React from "react";
import {  View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Dashboard";

const ProfileScreen = ( props ) => {
    const { userEmail } = props;

    return(
        <View style={ Styles.container }>
            <ScrollView vertical>
                <Text style={ Styles.texto }>Estamos en Dashboard</Text>
                <Text style={ Styles.texto }>Soy Perfil/Cuenta</Text>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;