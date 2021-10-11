import React from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Styles from "../../../resources/styles/Public";

const RegisterScreen = (route) => {
    const { navigation } = route;
    
    const registrarse = () => {
        alert("Registrarse")
        navigation.navigate("register")
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
                <View style={[ Styles.form, Styles.hr ]}>
                    <Text style={ Styles.tituloview }>Crear una cuenta de usuario</Text>
                    <View>
                        <Text style={ Styles.lbl }>Usuario</Text>
                        <TextInput
                            style={ Styles.txt }
                            placeholder="Ingrese el usuario..."
                        />
                    </View>
                    <View>
                        <Text style={ Styles.lbl }>Correo</Text>
                        <TextInput
                            style={ Styles.txt }
                            placeholder="Ingrese el correo..."
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
                <View style={ Styles.grpbtn }>
                    <TouchableOpacity
                        onPress={ () => registrarse() }
                        style={ Styles.btn }
                    >
                        <View style={ Styles.btndecorado }>
                            <Text style={ Styles.txtbtn }>Registrarse</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ () => navigation.navigate("auth") }
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
            </ScrollView>
        </View>
    );
}

export default RegisterScreen;