import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "../resources/styles/styleIndexSuscrip";
import firebase from "../database/firebase";

export default function CardGrupo(props) {
    const { key, grupo } = props;

    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        const intg = [];
        firebase.db
            .collection("Integrantes")
            .where("id_grupo", "==", grupo.id)
            .onSnapshot((queryIntegrant) => {
                queryIntegrant.docs.forEach( docInt => {
                    const { id_usuario } = docInt.data();
                    intg.push({
                        id: docInt.id,
                        id_usuario,
                    })
                });
                setCantidad(intg.length);
            });
    }, [grupo])

    return(
        <TouchableOpacity 
            key={ key }
            style={ Styles.card_grp }
        >
            <View>
                <Image
                    style={ Styles.card_image }
                    source={{ uri: grupo.img }}
                />
            </View>
            <View
                style={ Styles.card_info }
            >
                <View>
                    <Text style={ Styles.card_nombre }>
                        { grupo.nombre }
                    </Text>
                </View>
                <View>
                    <Text style={ Styles.card_descrip }>
                        { grupo.descripcion }
                    </Text>
                </View>
                <View>
                    <Text style={ Styles.card_cantidad }>
                        Cantidad Suscrita { cantidad ? cantidad : "#" }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
