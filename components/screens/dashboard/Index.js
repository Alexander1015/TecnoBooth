import React from "react";
import {  View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/Dashboard";

const IndexScreen = ( props ) => {
    const { userEmail } = props;

    return(
        <View style={ Styles.container }>
            <ScrollView 
                vertical
            >
                <Text style={ Styles.texto }>Estamos en Dashboard</Text>
                <Text style={ Styles.texto }>Soy Index</Text>
                <Text style={ Styles.texto }>{ userEmail }</Text>
            </ScrollView>
        </View>
    );
}

export default IndexScreen;