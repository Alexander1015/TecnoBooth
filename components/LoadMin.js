import React from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../resources/utils/Colors";

const Loading = () => {
    return (
        <View>
            <ActivityIndicator
                size="large"
                color={Colors.SECUNDARY_COLOR}
                style={{ marginVertical: 30, }}
            />
        </View>
    );
};

export default Loading;
