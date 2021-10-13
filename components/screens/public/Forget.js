import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../../database/firebase";
import Styles from "../../../resources/styles/Public";
import PasswordScreen from "./Password";

const ForgetScreen = (route) => {
    const { navigation } = route;
    
    const [email, setEmail] = useState("");
    const [comprobado, setComprobado] = useState(false);

    const onChangeEmail = (dato) => {
        var nwdato = "";
        for (var i = 0; i < dato.length; i++) {
            if(i < 100) {   //Solo permitimos hasta 100 caracteres
                nwdato += dato[i];
            }
        }
        setEmail(nwdato);
    }

    const leeremail = () => {
        if(email.trim() === "") {
            alerta("Error", "Debe rellenar el campo de correo");
        }
        else {
            setComprobado(true);
        }
    }

    const alerta = (title, msg) => {
        Alert.alert(
            title,
            msg,
            [ { text: "Ok" } ]
        );
    }

    const auth = () => {
        reset();
        navigation.navigate("auth");
    }

    const reset = () => {
        setEmail("");
    }

    return(
        <>
            <View style={ Styles.container }>
                <View style={ Styles.header }>
                    <View>
                        <Text style={ Styles.txtheader }>TecnoBooth</Text>
                    </View>
                    <View style={ Styles.navcontainimg }>
                        <Image
                            style={ Styles.navimg }
                            source={ require("../../../resources/img/favicon.png") }
                        />
                    </View>
                    <TouchableOpacity
                        onPress={ () => navigation.navigate("auth") }
                        style={ Styles.leftnav }
                    >
                        <View>
                            <FontAwesome5 style={ Styles.txtleftnav } name="arrow-left" />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    vertical
                    style={ Styles.scroll }
                >
                    <View style={ Styles.container }>
                        <View style={[ Styles.form, Styles.hr ]}>
                            <Text style={ Styles.tituloview }>Olvide mi contraseña</Text>
                            <View>
                                <Text style={ Styles.lbl }>Ingrese su Correo</Text>
                                <TextInput
                                    style={ Styles.txt }
                                    placeholder="Ingrese su correo..."
                                    onChangeText={(txt) => onChangeEmail(txt.trim())}
                                    value={ email }
                                    keyboardType="email-address"
                                />
                            </View>
                            <View style={ Styles.viewbtncomp }>
                                <TouchableOpacity
                                    onPress={ () => leeremail() }
                                    style={ Styles.btn }
                                >
                                    <View style={ Styles.btndecorado }>
                                        <Text style={ Styles.txtbtn }>Comprobar Dirección de Correo</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => auth()}
                                >
                                    <Text style={ Styles.olvidar }>
                                        <FontAwesome5
                                            name="angle-double-left"
                                        /> Te acordaste de tu contraseña? Iniciar Sesión <FontAwesome5
                                            name="angle-double-right"
                                        />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <PasswordScreen email={ email } comprobado={ comprobado }/>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

export default ForgetScreen;