import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { styles } from "../../../../../resources/styles/styleGroupInfo";
import firebase from "../../../../../database/firebase";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Info() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    firebase.db.collection("Grupo").onSnapshot((querySnapshot) => {
      const grupos = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, informacion, descripcion, img } = doc.data();
        grupos.push({
          id: doc.id,
          nombre,
          informacion,
          descripcion,
          img,
        });
      });
      setGrupos(grupos);
    });
  }, []);

  const [seleccion, setSeleccion] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState("");

  useEffect(() => {
    firebase.db
      .collection("Grupo")
      .where("nombre", "==", nombreGrupo)
      .onSnapshot((querySnapshot) => {
        const seleccion = [];
        querySnapshot.docs.forEach((doc) => {
          const { nombre, informacion, descripcion, img } = doc.data();
          seleccion.push({
            id: doc.id,
            nombre,
            informacion,
            descripcion,
            img,
          });
        });
        setSeleccion(seleccion);
      });
  }, [nombreGrupo]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contenedorpicker}>
          <Picker
            style={styles.estilopicker}
            onValueChange={(text) => setNombreGrupo(text)}
            selectedValue={nombreGrupo}
          >
            <Picker.Item label="--Seleccione un grupo--" value="" />
            {grupos.map((grupos) => {
              return (
                <Picker.Item label={grupos.nombre} value={grupos.nombre} />
              );
            })}
          </Picker>
        </View>
        {
          seleccion.map((seleccion, pos) => {
            return (
              <View key={pos}>
                <>
                  <View style={styles.card_template}>
                    <Image
                      style={styles.card_image}
                      source={{ uri: seleccion.img }}
                    />
                  </View>
                  <View>
                    <Text style={styles.texto}>
                      <FontAwesome5 name="angle-double-left" size={18} />
                      {seleccion.nombre}
                      <FontAwesome5 name="angle-double-right" size={18} />
                    </Text>
                  </View>
                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      editable={false}
                      underlineColorAndroid="transparent"
                      value={"Descripción: " + seleccion.descripcion}
                      numberOfLines={5}
                      multiline={true}
                    />
                  </View>
                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      editable={false}
                      underlineColorAndroid="transparent"
                      value={"Otra información: " + seleccion.informacion}
                      numberOfLines={5}
                      multiline={true}
                    />
                  </View>
                </>
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );
}
