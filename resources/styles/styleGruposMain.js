import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
    titulo: {
        textAlign: "center",
        fontSize: 24,
        color: Colors.SECUNDARY_COLOR,
        marginBottom: 10,
    },
    form: {
        paddingBottom: 10,
        width: "100%",
        alignSelf: "center",
    },
    lbl: {
        fontSize: 15,
        color: Colors.SECUNDARY_COLOR,
        marginBottom: 10,
    },
    txt: {
        backgroundColor: Colors.SECUNDARY_COLOR,
        color: Colors.PRIMARY_COLOR,
        padding: 5,
        borderRadius: 2,
        marginBottom: 20,
        fontSize: 15,
    },
    hr: {
        borderColor: Colors.SECUNDARY_COLOR,
        borderBottomWidth: 1,
        width: "90%",
        paddingBottom: 30,
    },
    contenedorpicker: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: Colors.SECUNDARY_COLOR,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: "center",
      },
    estilopicker: {
        paddingRight: "100%",
        height: "100%",
        color: Colors.PRIMARY_COLOR,
    },
    grupos: {
        marginVertical: 10,
    },
    card_grp: {
        borderColor: Colors.SECUNDARY_COLOR,
        borderWidth: 1,
        width: "90%",
        marginTop: 20,
        alignSelf: "center",
        borderRadius: 5,
    },
    card_image: {
        alignSelf: "center",
        width: "100%",
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 5,
    },
    card_info: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    card_nombre: {
        color: Colors.SECUNDARY_COLOR,
        fontSize: 28,
        textAlign: "left",
    },
    card_descrip: {
        borderColor: Colors.SECUNDARY_COLOR,
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        width: "100%",
        textAlign: "justify",
        color: Colors.SECUNDARY_COLOR,
        fontSize: 15,
    },
    card_cantidad: {
        color: Colors.SECUNDARY_COLOR,
        fontSize: 15,
        textAlign: "right",
        marginVertical: 10,
    },
});

export default Styles;
