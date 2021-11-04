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
export default function Info(props) {
  const { idgrupo } = props;
  
  const [idgrupohome, setIdgrupohome] = useState(idgrupo);
  const [grupos, setGrupos] = useState([]);
  const [seleccion, setSeleccion] = useState([]);
  const [idGrupo, setIdGrupo] = useState("");
  const [cambio, setCambio] = useState("");
  const [integrante, setIntegrante] = useState([]);
  const [cantidadsus, setcantidadsus] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [listado, setListado] = useState([]);
  const [cargar, setCargar]=useState(true);

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

  //Obtengo todos los usuarios
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

  //Obtengo la info del grupo que necesito
  useEffect(() => {
    const seleccion = [];
    grupos.map((grupos) => {
      if(grupos.id==idgrupohome){
        seleccion.push({
          id: grupos.id,
          nombre: grupos.nombre,
          informacion: grupos.informacion,
          descripcion: grupos.descripcion,
          img: grupos.img,
        });
      }
    });
    setSeleccion(seleccion);
    seleccion.map((seleccion) => {
      setIdGrupo(seleccion.id);
    });
  }, [usuarios]);

  //Obtengo la id de los integrantes del grupo
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
      });
  }, [seleccion]);

  //Obtengo la info de los integrantes con el id anterior
  useEffect(()=>{
      const listado = [];
      integrante.map((integrante) => {
        usuarios.map((usuarios) => {
          if (usuarios.id === integrante.id_usuario) {
            listado.push({
              nombre: usuarios.usuario.toUpperCase(),
              img: usuarios.img,
            });
            setListado(listado);
          }
        });
      });
  }, [cantidadsus])


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              {
                  <View style={styles.contenedorintegrantes}>
                  <Image
                      style={styles.imagenintegrante}
                      source={{uri: listado.img}}
                    />
                    <Text style={styles.nombreintegrante}>{listado.nombre}</Text>
                  </View>
                 
                }
              </>
            );
        })
      }
      </ScrollView>
    </View>
  );
}
