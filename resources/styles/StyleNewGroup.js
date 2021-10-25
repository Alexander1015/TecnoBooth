import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";

const { width } = Dimensions.get("window");

export const stylesnewgroup = StyleSheet.create({
    contenedorImagen: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        backgroundColor: Colors.SECUNDARY_COLOR,
        color: Colors.PRIMARY_COLOR,
        padding: 5,
        borderRadius: 2,
        marginBottom: 20,
        fontSize: 15,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: Constants.statusBarHeight,
    },
    containerForm: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    textInput: {
        fontSize: 15,
        color: Colors.SECUNDARY_COLOR,
        marginBottom: 10,
    },
    viewInput: {
        width: width > 1000 ? "50%" : "90%",
    },
    textoError: {
        color: "red",
        fontSize: 16,
        borderLeftWidth: 4,
        borderLeftColor: "red",
        paddingLeft: 5,
        marginTop: -8,
    },
    viewbtndecor: {
        width: "90%",
        paddingVertical: 15,
    },
    btn: {
        backgroundColor: Colors.SECUNDARY_COLOR,
        width: "100%",
        padding: 5,
        borderRadius: 5,
        marginBottom: 20,
    },
    btndecorado: {
        margin: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderWidth: 1,
        padding: 5,
    },
    txtbtn: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
    },
    titulo: {
        fontSize: 30,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginHorizontal: 10,
        fontWeight: "bold",
    },
});
