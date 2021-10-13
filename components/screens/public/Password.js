import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert, LogBox, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../../database/firebase";
import Styles from "../../../resources/styles/Public";
import Colors from "../../../resources/utils/Colors"

const PasswordScreen = (props) => {
    const { email, comprobado } = props;
    if(comprobado) {
        const [answer, setAnswer] = useState("");
        const [question, setQuestion] = useState(null);

        const onChangeAnswer = (dato) => {
            var nwdato = "";
            for (var i = 0; i < dato.length; i++) {
                if(i < 50) {   //Solo permitimos hasta 50 caracteres
                    nwdato += dato[i];
                }
            }
            setAnswer(nwdato)
        }

        const obtenerpassword = () => {
            if(answer.trim() === "" /*&& answer.length > 0*/) {
                alerta("Error", "Debe rellenar el campo de respuesta de seguridad correctamente");
            }
            else {
                firebase.auth.createUserWithEmailAndPassword(email, password)
                    .then(
                        async (userCredential) => {
                            await firebase.db.collection("Usuarios").add({
                                usuario: user,
                                correo: email,
                                pregunta: question,
                                respuesta: answer,
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

        const reset = () => {
            setAnswer("");
        }

        //Preguntas de seguridad
        const PG1 = "Nombre de mi primer mascota?";
        const PG2 = "Nombre de soltera de mi madre?";
        const PG3 = "Nombre de mi hermano?";
        const PG4 = "Nombre del colegio en donde estudie?";
        const PG5 = "Nombre de primer trabajo?";

        return(
            <View style={ Styles.form }>
                <Text style={ Styles.tituloview }>Pregunta ""</Text>
                <View>
                    <Text style={ Styles.lbl }>Ingrese su Respuesta de Seguridad</Text>
                    <TextInput
                        style={ Styles.txt }
                        placeholder="Ingrese su respuesta de seguridad..."
                        onChangeText={(txt) => onChangeAnswer(txt)}
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
                            <Text style={ Styles.txtbtn }>Obtener Contraseña</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    else {
        return (
            <View></View>
        );
    }
}

export default PasswordScreen;