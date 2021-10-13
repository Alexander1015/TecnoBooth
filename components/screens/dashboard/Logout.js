import React, { useEffect } from "react";
import { View } from "react-native";
import firebase from "../../../database/firebase";
import Colors from "../../../resources/utils/Colors";

const LogoutScreen = (route) => {
    const { navigation } = route;
    
    useEffect(() => {
        firebase.auth.signOut()
            .then(() => navigation.navigate("public"))
            .catch(() => navigation.navigate("dashboard"))
    }, [navigation])
    return <View style={{ flex: 1, backgroundColor: Colors.PRIMARY_COLOR }} />;
}

export default LogoutScreen;