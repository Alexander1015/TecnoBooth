import {
    StyleSheet,
    Dimensions
} from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors"

export const styleprofile = StyleSheet.create({
    titulo: {
        fontSize: 30,
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 65,
        fontWeight: "bold"
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
        marginTop: 10
    },
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    viewInput: {
        marginTop: 5
    },
    textInput: {
        color: 'white',
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    contenedorImagen: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
    },
    botonImagen: {
        marginHorizontal: 25,
        backgroundColor: Colors.SECUNDARY_COLOR,
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderRadius: 20,
    },
    botonGuardar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: Colors.SECUNDARY_COLOR,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 20,

    },
    textoError: {
        color: 'red',
        fontSize: 16,
        borderLeftWidth: 4,
        borderLeftColor: 'red',
        paddingLeft: 5,
        marginTop: -8,
    }
})