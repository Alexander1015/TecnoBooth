import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../resources/styles/styleIndexSuscrip";
import firebase from "../../../database/firebase";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import CardGrupo from "../../../hooks/CardGrupo";

const IndexScreen = (props) => {
    const { userEmail } = props;

    const [grupos, setGrupos] = useState([]);
    const [search, setSearch] = useState("");
    const [clasi, setClasi] = useState("");
    
    useEffect(() => {
        const grupo = [];
        firebase.db
            .collection("Grupo")
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
    }, []);

    return (
        <View style={Styles.container}>
            <ScrollView vertical style={Styles.scroll}>
                <View style={[Styles.form, Styles.hr]}>
                    <View>
                        <Text style={Styles.lbl}>Buscar</Text>
                        <TextInput
                            style={Styles.txt}
                            placeholder="Ingrese su busqueda..."
                            onChangeText={(txt) => setSearch(txt)}
                            value={search}
                        />
                    </View>
                    <View style={Styles.contenedorpicker}>
                        <Picker
                            style={Styles.estilopicker}
                            onValueChange={(text) => setClasi(text)}
                            selectedValue={clasi}
                        >
                            <Picker.Item label="Clasificaciones" value="" />
                            <Picker.Item label="Robotica" value="Robotica" />
                            <Picker.Item label="Dispositivos Moviles" value="Dispositivos Moviles" />
                            <Picker.Item label="Computadoras" value="Computadoras" />
                            <Picker.Item label="Electronica" value="Electronica" />
                            <Picker.Item label="Varios" value="Varios" />
                        </Picker>
                    </View>
                </View>
                <View style={ Styles.grupos }>
                    {
                        grupos.length > 0 ? (
                            grupos.map((grupo, key) => {
                                return (
                                    <CardGrupo key={key} grupo={grupo}></CardGrupo>
                                );
                            })
                        ) : (
                            <Text style={ Styles.noexis }>No existen grupos que mostrar.</Text>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default IndexScreen;
