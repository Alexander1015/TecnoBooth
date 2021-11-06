import React from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import Styles from "../resources/styles/styleLoading";
import Colors from "../resources/utils/Colors";

const Loading = () => {
    return (
        <View style={Styles.container}>
            <ActivityIndicator
                size="large"
                color={Colors.SECUNDARY_COLOR}
                style={Styles.load}
            />
        </View>
    );
};

export default Loading;
