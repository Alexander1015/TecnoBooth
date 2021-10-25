import {
    StyleSheet,
    Dimensions
} from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors"

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
        width: "100%",
        height: "100%",
    },
    containlogo: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        alignItems: "center",
        marginBottom: 20,
    },
    txtlogo: {
        textAlign: "center",
        fontSize: 30,
        color: Colors.SECUNDARY_COLOR,
        marginBottom: 30
    },
    form: {
        paddingBottom: 10,
        marginBottom: 20,
        width: "90%",
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
    },
    grpbtn: {
        marginBottom: 20,
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
    olvidar: {
        textAlign: "center",
        marginBottom: 20,
        color: Colors.SECUNDARY_COLOR,
    },
    tituloview: {
        color: Colors.SECUNDARY_COLOR,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    header: {
        backgroundColor: Colors.SECUNDARY_COLOR,
        width: Dimensions.get("window").width,
        height: 55,
        justifyContent: "center",
    },
    txtheader: {
        color: Colors.PRIMARY_COLOR,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 2,
    },
    navcontainimg: {
        position: "absolute",
        right: 0,
        marginRight: 20,
    },
    navimg: {
        width: 30,
        height: 30,
    },
    leftnav: {
        position: "absolute",
        marginLeft: 20,
        height: 25,
        width: 25,
    },
    txtleftnav: {
        fontSize: 20,
    },
    viewbtndecor: {
        width: "90%",
        paddingVertical: 15,
    },
    viewbtncomp: {
        width: "100%",
    },
    cmb: {
        marginBottom: 10,
    }
})

export default Styles;