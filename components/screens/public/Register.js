import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert, LogBox, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../../database/firebase";
import Styles from "../../../resources/styles/Public";
import Colors from "../../../resources/utils/Colors"

//LogBox.ignoreLogs(["Setting a timer"]);

const RegisterScreen = (route) => {
    const { navigation } = route;
    
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");

    const onChangeUser = (dato) => {
        var nwdato = "";
        var caracter = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz ";
        for (var i = 0; i < dato.length; i++) {
            if(caracter.indexOf(dato[i]) > -1 || (dato[i] >= 0 && dato[i] <= 9)) {    //Aceptamos solo si el caracter se encuentra
                if(i < 25) {   //Solo permitimos hasta 25 caracteres
                    nwdato += dato[i];
                }
            }
        }
        setUser(nwdato);
    }

    const onChangeEmail = (dato) => {
        var nwdato = "";
        for (var i = 0; i < dato.length; i++) {
            if(i < 100) {   //Solo permitimos hasta 100 caracteres
                nwdato += dato[i];
            }
        }
        setEmail(nwdato);
    }

    const onChangePassword = (dato) => {
        var nwdato = "";
        for (var i = 0; i < dato.length; i++) {
            if(i < 50) {   //Solo permitimos hasta 50 caracteres
                nwdato += dato[i];
            }
        }
        setPassword(nwdato)
    }

    const registrarse = () => {
        if(user.trim() === "" && user.length > 2) {
            alerta("Error", "Debe rellenar el campo de usuario correctamente");
        }
        else if(email.trim() === "" && email.length > 5) {
            alerta("Error", "Debe rellenar el campo de correo correctamente");
        }
        else if(password.trim() === ""  && email.length > 8) {
            alerta("Error", "Debe rellenar el campo de contraseña correctamente");
        }
        else if(repeat.trim() === "") {
            alerta("Error", "Debe repetir la contraseña correctamente");
        }
        else if(password != repeat) {
            alerta("Error", "Las contraseñas escritas no coinciden");
        }
        else {
            firebase.auth.createUserWithEmailAndPassword(email, password)
                .then(
                    async (userCredential) => {
                        await firebase.db.collection("Usuarios").add({
                            usuario: user,
                            correo: email,
                            cantidad: 0,
                            img: "",
                            visible: true,
                            password: password,
                        });
                        reset();
                        alerta("Bienvenido", "Ha ingresado sus datos correctamente, Bienvenido a TecnoBooth");
                        navigation.navigate("dashboard", { email: email })
                    }
                )
                .catch((error) => {
                    if(error.code === "auth/invalid-email") {
                        alerta("Error", "El correo ingresado es invalido");
                    }
                    else if(error.code === "auth/email-already-in-use") {
                        alerta("Error", "El correo ingresado ya esta en uso");
                    }
                    else {
                        alert("Error", error.message);
                    }
                })
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
        setUser("");
        setEmail("");
        setPassword("");
        setRepeat("");
    }

    return(
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
                        <Text style={ Styles.tituloview }>Crear una nueva cuenta de Usuario</Text>
                        <View>
                            <Text style={ Styles.lbl }>Ingrese el Usuario</Text>
                            <TextInput
                                style={ Styles.txt }
                                placeholder="Ingrese el usuario..."
                                onChangeText={(txt) => onChangeUser(txt)}
                                value={ user }
                            />
                        </View>
                        <View>
                            <Text style={ Styles.lbl }>Ingrese el Correo</Text>
                            <TextInput
                                style={ Styles.txt }
                                placeholder="Ingrese el correo..."
                                onChangeText={(txt) => onChangeEmail(txt.trim())}
                                value={ email }
                                keyboardType="email-address"
                            />
                        </View>
                        <View>
                            <Text style={ Styles.lbl }>Ingrese la Contraseña</Text>
                            <TextInput
                                style={ Styles.txt }
                                placeholder="Ingrese la contraseña..."
                                onChangeText={(txt) => onChangePassword(txt)}
                                value={ password }
                                secureTextEntry={ true }
                            />
                        </View>
                        <View>
                            <Text style={ Styles.lbl }>Verifique la Contraseña</Text>
                            <TextInput
                                style={ Styles.txt }
                                placeholder="Verifique la contraseña anterior..."
                                onChangeText={(txt) => setRepeat(txt)}
                                secureTextEntry={ true }
                                value={ repeat }
                            />
                        </View>
                    </View>
                    <View style={[ Styles.viewbtndecor, Styles.grpbtn ]}>
                        <TouchableOpacity
                            onPress={ () => registrarse() }
                            style={ Styles.btn }
                        >
                            <View style={ Styles.btndecorado }>
                                <Text style={ Styles.txtbtn }>Registrarse</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => auth()}
                        >
                            <Text style={ Styles.olvidar }>
                                <FontAwesome5
                                    name="angle-double-left"
                                /> Posees una cuenta? Iniciar Sesión <FontAwesome5
                                    name="angle-double-right"
                                />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const picketSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 21,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 2,
        color: Colors.PRIMARY_COLOR,
        paddingRight: 30,
        backgroundColor: Colors.SECUNDARY_COLOR,
        marginLeft: -5,
        marginRight: -5,
    },
    inputAndroid: {
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 17,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 2,
        color: Colors.PRIMARY_COLOR,
        paddingRight: 30,
        backgroundColor: Colors.SECUNDARY_COLOR,
    },
});

export default RegisterScreen;