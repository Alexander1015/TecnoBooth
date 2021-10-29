import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { styles } from "../../../../../resources/styles/styleGroupInteg";
import firebase from "../../../../../database/firebase";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { set } from "react-native-reanimated";
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

  useEffect(() => {
    firebase.db.collection("Usuarios").onSnapshot((querySnapshot) => {
      const usuarios = [];
      querySnapshot.docs.forEach((doc) => {
        const { usuario, img } = doc.data();
        usuarios.push({
          id: doc.id,
          usuario,
          img,
        });
      });
      setUsuarios(usuarios);
      
    });
  }, []);

  const [seleccion, setSeleccion] = useState([]);
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [cambio, setCambio] = useState("");
  const [integrante, setIntegrante] = useState([]);
  const [cantidadsus, setcantidadsus] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [listado, setListado] = useState([]);
  const [cargar, setCargar]=useState(true);
  

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
        seleccion.map(seleccion=>{
          setIdGrupo(seleccion.id)
        })
        if(nombreGrupo===''){
          setCargar(false)
        }else{
          setCargar(true)
        }
      });
  }, [nombreGrupo]);

  useEffect(() => {
    firebase.db
      .collection("Integrantes")
      .where("id_grupo", "==", idGrupo)
      .onSnapshot((querySnapshot) => {
        const integrante = [];
        querySnapshot.docs.forEach((doc) => {
          const { id_usuario } = doc.data();
          integrante.push({
            id: doc.id,
            id_usuario,
          });
        });
        setIntegrante(integrante);
        setcantidadsus(integrante.length);
        setCambio(Math.floor(Math.random() * 100) + 1 )
      });
  }, [idGrupo]);

  useEffect(()=>{
    if (cargar) {
      const listado = [];
      usuarios.map((usuarios) => {
        integrante.map((integrante) => {
          if (usuarios.id === integrante.id_usuario) {
            listado.push({
              nombre: usuarios.usuario.toUpperCase(),
              img: usuarios.img,
            });
            setListado(listado);
            listado.map((listado) => {
              console.log(listado.img);
            });
          }
        });
      });
    }
  }, [cambio])


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
                  <View style={styles.contenedorcantidadintegrantes}>
                    <Text style={styles.cantidadintegrantes}>Cantidad de integrantes: {cantidadsus} </Text>
                  </View>
                </>
              </View>
            );
          })
        }
        
        {
          listado.map((listado, pos) => {
            return (
              <>
              {cargar ? (
                  <View style={styles.contenedorintegrantes}>
                  <Image
                      style={styles.imagenintegrante}
                      source={{uri: listado.img}}
                    />
                    <Text style={styles.nombreintegrante}>{listado.nombre}</Text>
                  </View>
                 ):null
                }
              </>
            );
        })
      }
      </ScrollView>
    </View>
  );
}
