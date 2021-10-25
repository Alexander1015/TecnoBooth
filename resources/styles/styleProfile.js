import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";

export const styleprofile = StyleSheet.create({
    titulo: {
        fontSize: 30,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginHorizontal: 10,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingHorizontal: 10,
        paddingBottom: 10,
        paddingTop: Constants.statusBarHeight,
    },
    texto: {
        color: "white",
        fontSize: 18,
        marginTop: 10,
    },
    containerForm: {
        paddingHorizontal: 20,
        flex: 1,
    },
    viewInput: {
        marginTop: 5,
    },
    textInput: {
        fontSize: 15,
        color: Colors.SECUNDARY_COLOR,
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
    contenedorImagen: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
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
    viewbtndecortot: {
        width: "100%",
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
});
