import { StyleSheet, Dimensions } from "react-native";
import Colors from "../utils/Colors";

const Styles = StyleSheet.create({
    backheader: {
        backgroundColor: Colors.SECUNDARY_COLOR,
        height: 80,
    },
    titheader: {
        color: Colors.PRIMARY_COLOR,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    navbar: {
        backgroundColor: Colors.PRIMARY_COLOR,
        width: 250,
        color: Colors.SECUNDARY_COLOR,
    },
    navbarcontain: {
        width: Dimensions.get("window").width - 120,
    },
    navcontainimg: {
        position: "absolute",
        left: "100%",
    },
    navimg: {
        width: 30,
        height: 30,
    },
});

export default Styles;
