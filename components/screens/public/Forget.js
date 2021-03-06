import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../../database/firebase";
import Styles from "../../../resources/styles/stylePublic";
import Load from "../../Load";

const ForgetScreen = (route) => {
    const { navigation } = route;
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeEmail = (dato) => {
        var nwdato = "";
        for (var i = 0; i < dato.length; i++) {
            if (i < 100) {
                //Solo permitimos hasta 100 caracteres
                nwdato += dato[i];
            }
        }
        setEmail(nwdato);
    };

    const leeremail = async () => {
        setLoading(true);
        if (email.trim() === "") {
            setLoading(false);
            alerta("Error", "Debe rellenar el campo de correo");
        } else {
            await firebase.auth
                .sendPasswordResetEmail(email)
                .then(() => {
                    setLoading(false);
                    reset();
                    alerta(
                        "Proceso exitoso",
                        "Se ha enviado un correo a su cuenta. Por favor sigue los pasos indicados"
                    );
                    navigation.navigate("auth");
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.code === "auth/invalid-email") {
                        alerta("Error", "El correo ingresado es invalido");
                    } else {
                        alert("Error", error.message);
                    }
                });
        }
    };

    const alerta = (title, msg) => {
        Alert.alert(title, msg, [{ text: "Ok" }]);
    };

    const auth = () => {
        reset();
        navigation.navigate("auth");
    };

    const reset = () => {
        setEmail("");
    };

    if (loading) {
        return <Load />;
    }
    return (
        <>
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <View>
                        <Text style={Styles.txtheader}>TecnoBooth</Text>
                    </View>
                    <View style={Styles.navcontainimg}>
                        <Image
                            style={Styles.navimg}
                            source={require("../../../resources/img/favicon.png")}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("auth")}
                        style={Styles.leftnav}
                    >
                        <View>
                            <FontAwesome5 style={Styles.txtleftnav} name="arrow-left" />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView vertical style={Styles.scroll}>
                    <View style={Styles.container}>
                        <View style={[Styles.form, Styles.hr]}>
                            <Text style={Styles.tituloview}>Olvide mi contrase??a</Text>
                            <View>
                                <Text style={Styles.lbl}>Ingrese su Correo</Text>
                                <TextInput
                                    style={Styles.txt}
                                    placeholder="Ingrese su correo..."
                                    onChangeText={(txt) => onChangeEmail(txt.trim())}
                                    value={email}
                                    keyboardType="email-address"
                                />
                            </View>
                            <View style={Styles.viewbtncomp}>
                                <TouchableOpacity
                                    onPress={() => leeremail()}
                                    style={Styles.btn}
                                >
                                    <View style={Styles.btndecorado}>
                                        <Text style={Styles.txtbtn}>
                                            Pedir cambio de Contrase??a
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => auth()}>
                                    <Text style={Styles.olvidar}>
                                        <FontAwesome5 name="angle-double-left" /> Te acordaste de tu
                                        contrase??a? Iniciar Sesi??n{" "}
                                        <FontAwesome5 name="angle-double-right" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default ForgetScreen;