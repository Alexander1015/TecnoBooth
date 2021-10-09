import React, { useEffect } from "react";
import { View } from "react-native";
import Colors from "../../../resources/utils/Colors";

const LogoutScreen = (route) => {
    const { navigation } = route;
    useEffect(() => {
        navigation.navigate("public");
    }, [navigation])
    return <View style={{ flex: 1, backgroundColor: Colors.PRIMARY_COLOR }} />;
}

export default LogoutScreen;