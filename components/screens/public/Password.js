import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import firebase from "../../../database/firebase";
import Styles from "../../../resources/styles/Public";

const PasswordScreen = (props) => {
    const { email, comprobado, question } = props;
    if(comprobado) {
        const [answer, setAnswer] = useState("");

        const onChangeAnswer = (dato) => {
            var nwdato = "";
            for (var i = 0; i < dato.length; i++) {
                if(i < 50) {   //Solo permitimos hasta 50 caracteres
                    nwdato += dato[i];
                }
            }
            setAnswer(nwdato)
        }

        const obtenerpassword = async () => {
            if(answer.trim() === "" /*&& answer.length > 0*/) {
                alerta("Error", "Debe rellenar el campo de respuesta de seguridad correctamente");
            }
            else {
                var verif = 0;
                await firebase.db.collection("Usuarios").where("correo", "==", email).where("pregunta", "==", question)
                    .get()
                    .then(( querySnapshot ) => {
                        querySnapshot.forEach((doc) => {
                            //doc.id //Obtener el id de la coleccion
                            verif++;
                            const { respuesta, password } = doc.data();
                            if(respuesta.trim() === answer.trim()) {
                                alerta("Contraña", "Respuesta correcta, su contraseña es: " + password);
                            }
                            else alerta("Error", "La respuesta de seguridad es incorrecta")
                        });
                    })
                    .catch(( error ) => {
                        alerta("Error", "Ah ocurrido un error al ejecutar el proceso, vuelva a intentarlo");
                    });
                if (verif === 0) alerta("Error", "Ah ocurrido un error al ejecutar el proceso, vuelva a intentarlo");
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

        return(
            <View style={ Styles.form }>
                <Text style={ Styles.tituloview }>{ question }</Text>
                <View>
                    <Text style={ Styles.lbl }>Ingrese su Respuesta de Seguridad</Text>
                    <TextInput
                        style={ Styles.txt }
                        placeholder="Ingrese su respuesta de seguridad..."
                        onChangeText={(txt) => onChangeAnswer(txt)}
                        value={ answer }
                    />
                </View>
                <View style={ Styles.viewbtncomp }>
                    <TouchableOpacity
                        onPress={ () => obtenerpassword() }
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