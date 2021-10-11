import React from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Styles from "../../../resources/styles/Public";

const AuthScreen = (route) => {
    const { navigation } = route;

    const login = () => {
        alert("Bienvenido")
        navigation.navigate("dashboard")
    }

    const olvidarpass = () => {
        alert("Que olvidadizo!");
    }

    const registrarse = () => {
        navigation.navigate("register")
    }

    return(
        <View style={ Styles.container }>
            <ScrollView
                vertical
                style={ Styles.scroll }
            >
                <View style={[ Styles.containlogo, Styles.hr ]}>
                    <Image
                        style={ Styles.logo }
                        source={ require("../../../resources/img/favicon.png") }
                    />
                    <Text style={ Styles.txtlogo }>TecnoBooth</Text>
                </View>
                <View style={[ Styles.form, Styles.hr ]}>
                    <View>
                        <Text style={ Styles.lbl }>Correo o Usuario</Text>
                        <TextInput
                            style={ Styles.txt }
                            placeholder="Ingrese el correo o usuario..."
                        />
                    </View>
                    <View>
                        <Text style={ Styles.lbl }>Contraseña</Text>
                        <TextInput
                            style={ Styles.txt }
                            placeholder="Ingrese la contraseña..."
                        />
                    </View>
                </View>
                <View style={[ Styles.grpbtn, Styles.hr ]}>
                    <TouchableOpacity
                        onPress={ () => login() }
                        style={ Styles.btn }
                    >
                        <View style={ Styles.btndecorado }>
                            <Text style={ Styles.txtbtn }>Ingresar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => olvidarpass()}
                    >
                        <Text style={ Styles.olvidar }>
                            <FontAwesome5
                                name="angle-double-left"
                            /> Olvidaste tu contraseña? <FontAwesome5
                                name="angle-double-right"
                            />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={ () => registrarse() }
                        style={ Styles.btn }
                    >
                        <View style={ Styles.btndecorado }>
                            <Text style={ Styles.txtbtn }>Registrarse</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default AuthScreen;