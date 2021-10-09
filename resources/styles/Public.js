import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors"

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
    //Inicio de los textos y botones de Ejemplo
    texto: {
        color: Colors.SECUNDARY_COLOR,
        fontSize: 18,
        textAlign: "center",
    },
    btngoto: {
        marginTop: 10,
        backgroundColor: Colors.SECUNDARY_COLOR,
        borderColor: Colors.SECUNDARY_COLOR,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    txtgoto: {
        fontSize: 20,
        textAlign: "center",
        color: Colors.PRIMARY_COLOR,
    },
    //Fin de los textos y botones de Ejemplo
})

export default Styles;