import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/styleIndexSuscrip";
import firebase from "../../../database/firebase";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import CardGrupo from "../../../hooks/CardGrupo";

const IndexScreen = (props) => {
    const initialState = {
        id: '',
        correo: '',
        cantidad: '',
    }

    const { userEmail } = props;
    const [user, setUser] = useState(initialState);
    const [tot, setTot] = useState(0);

    var total = 0;

    async function obtenerUser () {
        firebase.db
            .collection("Usuarios")
            .where("correo", "==", userEmail)
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

    function obtenerGrupos () {
        const grupo = [];
        firebase.db
            .collection("Grupo")
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
        obtenerUser();    
        obtenerGrupos();
    }, []);

    useEffect(() => {
        setTot(total);
    }, [total]);

    async function obtenerTotal () {
        total++;
    }

    const [grupos, setGrupos] = useState([]);
    const [search, setSearch] = useState("");
    const [clasi, setClasi] = useState("");

    const buscargrp = (txt, cmb) => {
        setSearch(txt);
        setClasi(cmb);
        const grupo = [];
        firebase.db
            .collection("Grupo")
            .orderBy("nombre")
            .startAt(txt)
            .endAt(txt + '\uf8ff')
            //.where("clasificacion", "==", cmb)
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
    
    if (user.cantidad !== null) {
        return (
            <View style={Styles.container}>
                <ScrollView vertical style={Styles.scroll}>
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
                                <Picker.Item label="Dispositivos Móviles" value="Dispositivos Móviles" />
                                <Picker.Item label="Electrónica" value="Electrónica" />
                                <Picker.Item label="Robótica" value="Robótica" />
                                <Picker.Item label="Varios" value="Varios" />
                                <Picker.Item label="Videojuegos" value="Videojuegos" />
                            </Picker>
                        </View>
                    </View>
                    <View style={ Styles.grupos }>
                        {
                            grupos.length > 0 ? (
                                grupos.map((grupo, key) => {
                                    return (
                                        <CardGrupo key={key} grupo={grupo} minimo={user.cantidad} obtenerTotal={obtenerTotal}></CardGrupo>
                                    );
                                })
                            ) : (
                                <Text style={ Styles.noexis }>No existen grupos que mostrar.</Text>
                            )
                        }
                        {
                            grupos.length === tot ? (
                                <Text style={ Styles.noexis }>No existen grupos que mostrar.</Text>
                            ) : (
                                <View></View>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
    else {
        return(
            <View style={Styles.container}>
                <ScrollView vertical style={Styles.scroll}>
                    <View style={ Styles.grupos }>
                        <Text style={ Styles.noexis }>No existen grupos que mostrar.</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default IndexScreen;
