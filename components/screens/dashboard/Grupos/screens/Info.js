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
import { set } from "react-native-reanimated";
import { useGestureHandlerRef } from "@react-navigation/stack";

const Info = (props) => {
  const { idgrupo } = props;
  
  const [idgrupohome, setIdgrupohome] = useState(idgrupo);
  
  const [grupos, setGrupos] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [gruposcompletos, setGruposcompletos] = useState([]);
  const [integrante, setIntegrante] = useState([]);
  const [misgrupos, setMisgrupos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [cantidadint, setCantidadint] = useState([]);
  
  
//Obtengo todos los grupos
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
//Obtengo usuario actual
  useEffect(() => {
    const { email } = firebase.auth.currentUser;
    firebase.db
      .collection("Usuarios")
      .where("correo", "==", email)
      .onSnapshot((querySnapshot) => {
        const usuario = [];
        querySnapshot.docs.forEach((doc) => {
          usuario.push({
            id: doc.id,
          });
        });
        setUsuario(usuario);
      });
  }, []);
//Obtengo todos los integrantes
  useEffect(() => {
    firebase.db
      .collection("Integrantes")
      .onSnapshot((querySnapshot) => {
        const integrante = [];
        querySnapshot.docs.forEach((doc) => {
          const { id_usuario, id_grupo } = doc.data();
          integrante.push({
            id: doc.id,
            id_usuario,
            id_grupo,
          });
        });
        setIntegrante(integrante);
      });
  }, []);
//Obtengo el id de mis grupos
  useEffect(() => {
    const misgrupos = [];
    misgrupos.push({
      id: idgrupohome
    })
    /*integrante.map((integrante) => {
      usuario.map((usuario) => {
        if (usuario.id == integrante.id_usuario) {
          misgrupos.push({
            id: integrante.id_grupo,
          });
        }
      });
    });*/
    setMisgrupos(misgrupos);
  }, [integrante]);
  
//Obtengo la info de mis grupos con el id de mis grupos
  useEffect(() => {
    const filtrados = [];
    misgrupos.map(misgrupos=>{
      grupos.map(grupos=>{
        if(misgrupos.id == grupos.id){
          filtrados.push({
            id: grupos.id,
            nombre: grupos.nombre,
            informacion: grupos.informacion,
            descripcion: grupos.descripcion,
            img: grupos.img,
          })
        }
      })
    })
    setFiltrados(filtrados)
  }, [misgrupos]);
//Obtengo la cantidad de integrantes 
  useEffect(() => {
    const cantidad = [];
    misgrupos.map(misgrupos=>{
      const listado = [];
      integrante.map(integrante=>{
        if(integrante.id_grupo == misgrupos.id){
          listado.push({
            id: integrante.id,
            grupo: misgrupos.id,
          });
        }
      });
      cantidad.push({
      cant: listado.length,
      grupo: misgrupos.id,
    });
    }); 
    setCantidadint(cantidad);
  }, [filtrados]);
//Agrego la cantidad de integrantes a la informacion de mis grupos
  useEffect(() => {
    const gruposcompletos=[];
    filtrados.map(filtrados=>{
      cantidadint.map(cantidadint=>{
        if(cantidadint.grupo == filtrados.id){
          gruposcompletos.push({
            id: filtrados.id,
            nombre: filtrados.nombre,
            informacion: filtrados.informacion,
            descripcion: filtrados.descripcion,
            img: filtrados.img,
            integrantes: cantidadint.cant,
          })
        }
      })
    })
    setGruposcompletos(gruposcompletos)
  }, [cantidadint]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          gruposcompletos.map((gruposcompletos, pos) => {
            return (
              <View key={pos}>
                <>
                  <View style={styles.card_template}>
                    <Image
                      style={styles.card_image}
                      source={{ uri: gruposcompletos.img }}
                    />
                  </View>
                  <View>
                    <Text style={styles.texto}>
                      <FontAwesome5 name="angle-double-left" size={18} />
                      {gruposcompletos.nombre}
                      <FontAwesome5 name="angle-double-right" size={18} />
                    </Text>
                  </View>

                  <View key={pos} style={styles.contenedorcantidadintegrantes}>
                    <Text key={pos} style={styles.cantidadintegrantes}>
                      Cantidad de integrantes: {gruposcompletos.integrantes}
                    </Text>
                  </View>

                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      editable={false}
                      underlineColorAndroid="transparent"
                      value={"Descripción: " + gruposcompletos.descripcion}
                      numberOfLines={5}
                      multiline={true}
                    />
                  </View>
                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      editable={false}
                      underlineColorAndroid="transparent"
                      value={"Otra información: " + gruposcompletos.informacion}
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

export default Info;