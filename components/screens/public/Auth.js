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

const AuthScreen = (route) => {
    const { navigation } = route;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        firebase.auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                reset();
                navigation.navigate("dashboard", { email: email });
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    alerta("Error", "El correo/contraseña ingresado es invalido");
                } else if (error.code === "auth/wrong-password") {
                    alerta("Error", "El correo/contraseña ingresado es invalido");
                } else {
                    alerta("Error", error.code);
                }
            });
    };

    const olvidarpass = () => {
        reset();
        navigation.navigate("forget");
    };

    const registrarse = () => {
        reset();
        navigation.navigate("register");
    };

    //Alert que contiene titulo y mensaje
    const alerta = (title, msg) => {
        Alert.alert(title, msg, [{ text: "Ok" }]);
    };

    const reset = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <ScrollView vertical style={Styles.scroll}>
            <View style={Styles.container}>
                <View style={[Styles.containlogo, Styles.hr]}>
                    <Image
                        style={Styles.logo}
                        source={require("../../../resources/img/favicon.png")}
                    />
                    <Text style={Styles.txtlogo}>TecnoBooth</Text>
                </View>
                <View style={[Styles.form, Styles.hr]}>
                    <View>
                        <Text style={Styles.lbl}>Correo</Text>
                        <TextInput
                            style={Styles.txt}
                            placeholder="Ingrese el correo..."
                            onChangeText={(txt) => setEmail(txt.trim())}
                            value={email}
                        />
                    </View>
                    <View>
                        <Text style={Styles.lbl}>Contraseña</Text>
                        <TextInput
                            style={Styles.txt}
                            placeholder="Ingrese la contraseña..."
                            onChangeText={(txt) => setPassword(txt.trim())}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={[Styles.grpbtn, Styles.hr]}>
                    <TouchableOpacity onPress={() => login()} style={Styles.btn}>
                        <View style={Styles.btndecorado}>
                            <Text style={Styles.txtbtn}>Ingresar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => olvidarpass()}>
                        <Text style={Styles.olvidar}>
                            <FontAwesome5 name="angle-double-left" /> Olvidaste tu contraseña?{" "}
                            <FontAwesome5 name="angle-double-right" />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.viewbtndecor}>
                    <TouchableOpacity onPress={() => registrarse()} style={Styles.btn}>
                        <View style={Styles.btndecorado}>
                            <Text style={Styles.txtbtn}>Registrarse</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default AuthScreen;
