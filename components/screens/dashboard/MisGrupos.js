import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/styleGruposMain";
import firebase from "../../../database/firebase";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import CardGrupo from "../../CardGrupo";
import Load from "../../LoadMin";

const GruposScreen = (route) => {
    const { navigation } = route;
    const { uid } = firebase.auth.currentUser;

    const [tot, setTot] = useState(0);

    var total = 0;

    const redireccionar = (idgrupo) => {
        if (idgrupo.trim() !== "") {
            navigation.navigate("grupos", { idgrupo: idgrupo });
        }
    };

    function obtenerGrupos() {
        const grupo = [];
        firebase.db
            .collection("Grupo")
            .where("id_usuario", "==", uid)
            .orderBy("nombre")
            .onSnapshot((queryGrupos) => {
                queryGrupos.docs.forEach((docGrp) => {
                    const { nombre, descripcion, img } = docGrp.data();
                    grupo.push({
                        id: docGrp.id,
                        nombre,
                        descripcion,
                        img,
                    });
                });
                setGrupos(grupo);
            });
    }

    useEffect(() => {
        obtenerGrupos();
    }, []);

    useEffect(() => {
        setTot(total);
    }, [total]);

    async function obtenerTotal() {
        total++;
    }

    const [grupos, setGrupos] = useState([]);
    const [search, setSearch] = useState("");
    const [clasi, setClasi] = useState("");

    const buscargrp = (txt, cmb) => {
        setSearch(txt);
        setClasi(cmb);
        const grupo = [];
        if (txt.trim() === "" && cmb.trim() === "") {
            obtenerGrupos();
        } else if (txt.trim() !== "" && cmb.trim() === "") {
            firebase.db
                .collection("Grupo")
                .where("id_usuario", "==", uid)
                .orderBy("nombre")
                .startAt(txt)
                .endAt(txt + "\uf8ff")
                .onSnapshot((queryGrupos) => {
                    queryGrupos.docs.forEach((docGrp) => {
                        const { nombre, descripcion, img } = docGrp.data();
                        grupo.push({
                            id: docGrp.id,
                            nombre,
                            descripcion,
                            img,
                        });
                    });
                    setGrupos(grupo);
                });
        } else if (txt.trim() === "" && cmb.trim() !== "") {
            firebase.db
                .collection("Grupo")
                .where("id_usuario", "==", uid)
                .where("clasificacion", "==", cmb)
                .orderBy("nombre")
                .onSnapshot((queryGrupos) => {
                    queryGrupos.docs.forEach((docGrp) => {
                        const { nombre, descripcion, img } = docGrp.data();
                        grupo.push({
                            id: docGrp.id,
                            nombre,
                            descripcion,
                            img,
                        });
                    });
                    setGrupos(grupo);
                });
        } else {
            firebase.db
                .collection("Grupo")
                .where("id_usuario", "==", uid)
                .where("clasificacion", "==", cmb)
                .orderBy("nombre")
                .startAt(txt)
                .endAt(txt + "\uf8ff")
                .onSnapshot((queryGrupos) => {
                    queryGrupos.docs.forEach((docGrp) => {
                        const { nombre, descripcion, img } = docGrp.data();
                        grupo.push({
                            id: docGrp.id,
                            nombre,
                            descripcion,
                            img,
                        });
                    });
                    setGrupos(grupo);
                });
        }
    };

    return (
        <View style={Styles.container}>
            <ScrollView vertical style={Styles.scroll}>
                <Text style={ Styles.titulo }>Grupos creados por mí</Text>
                <View style={[Styles.form, Styles.hr]}>
                    <View>
                        <Text style={Styles.lbl}>Buscar</Text>
                        <TextInput
                            style={Styles.txt}
                            placeholder="Ingrese su busqueda..."
                            onChangeText={(txt) => buscargrp(txt, clasi)}
                            value={search}
                        />
                    </View>
                    <View style={Styles.contenedorpicker}>
                        <Picker
                            style={Styles.estilopicker}
                            onValueChange={(txt) => buscargrp(search, txt)}
                            selectedValue={clasi}
                        >
                            <Picker.Item label="Clasificaciones" value="" />
                            <Picker.Item label="Computadoras" value="Computadoras" />
                            <Picker.Item
                                label="Dispositivos Móviles"
                                value="Dispositivos Móviles"
                            />
                            <Picker.Item label="Electrónica" value="Electrónica" />
                            <Picker.Item label="Robótica" value="Robótica" />
                            <Picker.Item label="Varios" value="Varios" />
                            <Picker.Item label="Videojuegos" value="Videojuegos" />
                        </Picker>
                    </View>
                </View>
                <View style={Styles.grupos}>
                    {grupos.length > 0 ? (
                        grupos.map((grupo, index) => {
                            return (
                                <CardGrupo
                                    key={index}
                                    grupo={grupo}
                                    minimo={ 0 }
                                    obtenerTotal={obtenerTotal}
                                    redireccionar={redireccionar}
                                ></CardGrupo>
                            );
                        })
                    ) : (
                        <Load />
                    )}
                    {grupos.length > 0 && grupos.length === tot ? (
                        <Load />
                    ) : (
                        <View></View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default GruposScreen;