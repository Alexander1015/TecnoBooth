import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: Constants.statusBarHeight,
    },
});

export default Styles;
