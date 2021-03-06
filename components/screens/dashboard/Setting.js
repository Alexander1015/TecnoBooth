import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, FlatList, Image } from "react-native";

import Styles from "../../../resources/styles/styleDashboard";
import { styleprofile } from "../../../resources/styles/styleProfile";
import { Picker } from "@react-native-picker/picker";
import firebase from "../../../database/firebase";
import Load from "../../Load";
import useGrupos from '../../../hooks/useGrupos';

const SettingScreen = () => {
    const initialState = {
        id: "",
        correo: "",
        cantidad: "",
        img: "",
        usuario: "",
    };

    const [user, setUser] = useState(initialState);

    const [loading, setLoading] = useState(false);
    const { email } = firebase.auth.currentUser;
    const [newCantidad, setNewCantidad] = useState("");

    async function obtenerUser() {
        setLoading(true);
        firebase.db
            .collection("Usuarios")
            .where("correo", "==", email)
            .onSnapshot((queryUser) => {
                queryUser.docs.forEach((docUsr) => {
                    const { correo, cantidad, img, usuario } = docUsr.data();
                    setUser({
                        id: docUsr.id,
                        correo: correo,
                        cantidad: cantidad,
                        img: img,
                        usuario: usuario,
                    });
                    setNewCantidad(cantidad);
                });
                setLoading(false);
            });
    }

    let isSuscribed = false;
    let cant = 0;

    useEffect(() => {
        isSuscribed = !isSuscribed;
        if (isSuscribed) obtenerUser();
    }, []);

    useEffect(() => {
        isSuscribed = !isSuscribed;
        if (isSuscribed) setNewCantidad(cant);
    }, [cant]);

    useEffect(() => {
        isSuscribed = !isSuscribed;
    }, [isSuscribed])

    if (loading) {
        <Load />;
    }

    const updateUser = async (value) => {
        setLoading(true);
        if (value.trim() !== "") {
            cant = value;
            const dbRef = firebase.db.collection("Usuarios").doc(user.id);
            await dbRef.set({
                cantidad: value,
                correo: user.correo,
                img: user.img,
                usuario: user.usuario,
            });
        }
        setLoading(false);
    }

    return (
        <View style={Styles.container}>
            <ScrollView vertical style={styleprofile.scroll}>
                <Text style={styleprofile.titulo}>Ajustes</Text>
                <View style={{ padding: 10 }}>
                    <Text style={styleprofile.subTitulo}>Mostrar grupos desde:</Text>
                </View>
                <View style={styleprofile.contenedorpicker}>
                    <Picker style={styleprofile.pickerDiseno}
                        selectedValue={ newCantidad }
                        onValueChange={ (value) => updateUser(value) }
                    >
                        <Picker.Item label="Sin limite de integrantes" value="0"/>
                        <Picker.Item label="5 integrantes" value="5"/>
                        <Picker.Item label="10 integrantes" value="10"/>
                        <Picker.Item label="25 integrantes" value="25"/>
                        <Picker.Item label="50 integrantes" value="50"/>
                        <Picker.Item label="100 integrantes" value="100"/>
                    </Picker>
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.subTitulo}>Acerca de TecnoBooth</Text>
                </View>
                <View style={styleprofile.contenedorImagen}>
                    <Image
                        source={require("../../../resources/img/favicon.png")}
                        style={styleprofile.imagenDiseno}
                    />
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.bordeTexto}>
                        TecnoBooth es una aplicaci??n destinada al intercambio de informaci??n
                        por parte de los usuarios, en donde se pueden crear
                        temas/grupos/canales de intereses seg??n los propios usuarios que te
                        permita editarlo a gusto, en donde cada uno de los integrantes pueda
                        compartir informaci??n sobre tecnolog??a (ya sean posts, im??genes,
                        pensamientos, informaci??n, link a alguna pagina, etc) y comentar
                        sobre estos
                    </Text>
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.subTitulo}>Desarrollado por:</Text>
                    <Text style={styleprofile.bordeTexto}>
                        <FlatList
                            data={[
                                { key: "??? Luis Felipe Coto Arias" },
                                { key: "??? Edgard Alexander Barrera Flamenco" },
                                { key: "??? Bryan Armando Salinas Sanchez" },
                                { key: "??? Josue Alexander Chavez Garcia" },
                            ]}
                            renderItem={({ item }) => (
                                <Text style={styleprofile.texto}>{item.key} </Text>
                            )}
                        />
                    </Text>
                </View>
                <View style={styleprofile.container}>
                    <Text style={styleprofile.vercionApp}>
                        Versi??n de aplicaci??n: 1.0
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default SettingScreen;
