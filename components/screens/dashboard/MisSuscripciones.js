import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/styleGruposMain";
import firebase from "../../../database/firebase";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import CardGrupo from "../../CardGrupo";
import Load from "../../LoadMin";

const SuscripcionesScreen = (route) => {
    const { navigation } = route;
    const { email } = firebase.auth.currentUser;

    const [search, setSearch] = useState("");
    const [clasi, setClasi] = useState("");

    const [grp, setGrp] = useState([]);
    const [grpint, setGrpInt] = useState([]);

    const initialState = {
        id: "",
        correo: "",
        cantidad: "",
    };

    const [user, setUser] = useState(initialState);
    const [tot, setTot] = useState(0);

    var total = 0;

    async function obtenerUser() {
        firebase.db
            .collection("Usuarios")
            .where("correo", "==", email)
            .onSnapshot((queryUser) => {
                queryUser.docs.forEach((docUsr) => {
                    const { correo, cantidad } = docUsr.data();
                    setUser({
                        id: docUsr.id,
                        correo: correo,
                        cantidad: cantidad,
                    });
                });
            });
    }

    const redireccionar = (idgrupo) => {
        if (idgrupo.trim() !== "") {
            navigation.navigate("grupos", { idgrupo: idgrupo });
        }
    };

    async function obtenerGIntegrantes() {
        const grupo = [];
        firebase.db
            .collection("Integrantes")
            .where("id_usuario", "==", user.id)
            .onSnapshot((queryInt) => {
                setGrpInt([]);
                if (queryInt.docs.length > 0) {
                    queryInt.docs.forEach((docInt) => {
                        const { id_grupo, id_usuario } = docInt.data();
                        grupo.push({
                            id: docInt.id,
                            id_grupo,
                            id_usuario,
                        });
                    });
                    setGrpInt(grupo);
                }
            });
    }

    async function obtenertotGrupos() {
        const grupo = [];
        firebase.db
            .collection("Grupo")
            .orderBy("nombre")
            .onSnapshot((queryGrupos) => {
                setGrp([]);
                if (queryGrupos.docs.length > 0) {
                    queryGrupos.docs.forEach((docGrp) => {
                        const { nombre, descripcion, img } = docGrp.data();
                        grpint.map((data) => {
                            if (data.id_grupo === docGrp.id) {
                                grupo.push({
                                    id: docGrp.id,
                                    nombre,
                                    descripcion,
                                    img,
                                });
                            }
                        });
                    });
                    setGrp(grupo);
                }
            });
        setSearch("");
        setClasi("");
    }

    let isSuscribed = false;
    useEffect(() => {
        isSuscribed = !isSuscribed;
        if (isSuscribed) obtenerUser();
    }, []);

    useEffect(() => {
        isSuscribed = !isSuscribed;
        if (isSuscribed) obtenerGIntegrantes();
    }, [user]);

    useEffect(() => {
        isSuscribed = !isSuscribed;
        if (isSuscribed) obtenertotGrupos();
    }, [grpint]);

    //Arregla la falla de memoria
    useEffect(() => {
        isSuscribed = !isSuscribed;
    }, [isSuscribed])

    useEffect(() => {
        setTot(total);
    }, [total]);

    async function obtenerTotal() {
        total++;
    }

    async function buscargrp(txt, cmb) {
        setSearch(txt);
        setClasi(cmb);
        if (txt.trim() === "" && cmb.trim() === "") {
            obtenertotGrupos();
        } else if (txt.trim() !== "" && cmb.trim() === "") {
            const grupo = [];
            firebase.db
                .collection("Grupo")
                .orderBy("nombre")
                .startAt(txt)
                .endAt(txt + "\uf8ff")
                .onSnapshot((queryGrupos) => {
                    setGrp([]);
                    if (queryGrupos.docs.length > 0) {
                        queryGrupos.docs.forEach((docGrp) => {
                            const { nombre, descripcion, img } = docGrp.data();
                            grpint.map((data) => {
                                if (data.id_grupo === docGrp.id) {
                                    grupo.push({
                                        id: docGrp.id,
                                        nombre,
                                        descripcion,
                                        img,
                                    });
                                }
                            });
                        });
                        setGrp(grupo);
                    }
                });
        } else if (txt.trim() === "" && cmb.trim() !== "") {
            const grupo = [];
            firebase.db
                .collection("Grupo")
                .orderBy("nombre")
                .where("clasificacion", "==", cmb)
                .onSnapshot((queryGrupos) => {
                    setGrp([]);
                    if (queryGrupos.docs.length > 0) {
                        queryGrupos.docs.forEach((docGrp) => {
                            const { nombre, descripcion, img } = docGrp.data();
                            grpint.map((data) => {
                                if (data.id_grupo === docGrp.id) {
                                    grupo.push({
                                        id: docGrp.id,
                                        nombre,
                                        descripcion,
                                        img,
                                    });
                                }
                            });
                        });
                        setGrp(grupo);
                    }
                });
        } else {
            const grupo = [];
            firebase.db
                .collection("Grupo")
                .orderBy("nombre")
                .where("clasificacion", "==", cmb)
                .startAt(txt)
                .endAt(txt + "\uf8ff")
                .onSnapshot((queryGrupos) => {
                    setGrp([]);
                    if (queryGrupos.docs.length > 0) {
                        queryGrupos.docs.forEach((docGrp) => {
                            const { nombre, descripcion, img } = docGrp.data();
                            grpint.map((data) => {
                                if (data.id_grupo === docGrp.id) {
                                    grupo.push({
                                        id: docGrp.id,
                                        nombre,
                                        descripcion,
                                        img,
                                    });
                                }
                            });
                        });
                        setGrp(grupo);
                    }
                });
        }
    };

    return (
        <View style={Styles.container}>
            <ScrollView vertical style={Styles.scroll}>
                <Text style={Styles.titulo}>Grupos a los que estoy Suscrito</Text>
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
                    {grp.length > 0 ? (
                        grp.map((grupo, index) => {
                            return (
                                <CardGrupo
                                    key={index}
                                    grupo={grupo}
                                    minimo={0}
                                    obtenerTotal={obtenerTotal}
                                    redireccionar={redireccionar}
                                ></CardGrupo>
                            );
                        })
                    ) : (
                        <Load />
                    )}
                    {grp.length > 0 && grp.length === tot ? (
                        <Load />
                    ) : (
                        <View></View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default SuscripcionesScreen;
