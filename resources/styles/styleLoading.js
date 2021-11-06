import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingBottom: 10,
        paddingHorizontal: 10,
        paddingTop: Constants.statusBarHeight,
    },
    scroll: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    load: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "100%",
    },
});

export default Styles;
