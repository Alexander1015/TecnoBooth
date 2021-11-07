import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import useGrupos from "../../../hooks/useActivity";
import Post from "../../Post";
import { NewPost } from "../../NewPost";
import { styles } from "../../../resources/styles/styleActivity";
import firebase from "../../../database/firebase";

const ActivityScreen = (route) => {
  const { idgrupo } = route;
  const { width } = Dimensions.get("window");

  const {
    grupo,
    grupos,
    posts,
    integrantes,
    idUsuario,
    verificado,
    subscribirse,
    obtenerHome,
    subirImagen,
    crearPost,
    //} = useGrupos(idgrupo);
  } = useGrupos("MUutMUnTx8tWEGLvqrIc");

  const [allgrupos, setallgrupos] = useState([]);
  const [misgrupos, setMisgrupos] = useState([]);
  const [integrante, setIntegrante] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [miusuario, setMiusuario] = useState([]);
  const [usuario2, setUsuario2] = useState('');
  const [misgruposconpost, setMisgruposconpost] = useState([]);
  const [postgroups, setPostgroups] = useState([]);
  const [postgroupsunicos, setPostgroupsunicos] = useState([]);
  const [cantidadposts, setCantidadPosts] = useState([]);

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
        setMiusuario(usuario);
        usuario.map(usuario=>{
          setUsuario2(usuario.id)
        })
      });
  }, []);

  useEffect(() => {
    firebase.db.collection("Grupo").onSnapshot((querySnapshot) => {
      const allgrupos = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, informacion, descripcion, img } = doc.data();
        allgrupos.push({
          id: doc.id,
          nombre,
          informacion,
          descripcion,
          img,
        });
      });
      setallgrupos(allgrupos);
    });
  }, []);
  
  useEffect(() => {
    firebase.db
    .collection("Post")
    .where('id_usuario','==',usuario2)
    .onSnapshot((querySnapshot) => {
      const misgruposconpost = [];
      querySnapshot.docs.forEach((doc) => {
        const { id_grupo } = doc.data();
        misgruposconpost.push({
          id: doc.id,
          id_grupo,
        });
      });
      setMisgruposconpost(misgruposconpost);
      misgruposconpost.map(a=>{
        console.log(a);
      })
    });
  }, [usuario2]);

  useEffect(() => {
    console.log('se')
    const postgroups = [];
    misgruposconpost.map(misgruposconpost=>{
      allgrupos.map(allgrupos=>{
        if(misgruposconpost.id_grupo == allgrupos.id){
          postgroups.push({
            nombre: allgrupos.nombre,
          })
        }
      });
    });
    setPostgroups(postgroups);
    setCantidadPosts(postgroups.length);
  }, [misgruposconpost]);

  const EliminarGruposDuplicados = (arr) => {
    const gruposMap = arr.map(grupos => {
      return [grupos.nombre, grupos]
    });
  
    return [...new Map(gruposMap).values()];
  }

  useEffect(() => {
    setPostgroupsunicos(EliminarGruposDuplicados(postgroups));
  }, [postgroups]);

  

  //Obtengo todos los integrantes
  useEffect(() => {
    firebase.db.collection("Integrantes").onSnapshot((querySnapshot) => {
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
    miusuario.map((miusuario) => {
      integrante.map((integrante) => {
        if (miusuario.id == integrante.id_usuario) {
          misgrupos.push({
            id: integrante.id_grupo,
          });
        }
      });
    });
    setMisgrupos(misgrupos);
  }, [integrante]);

  //Obtengo la info de mis grupos con el id de mis grupos
  useEffect(() => {
    const filtrados = [];
    misgrupos.map((misgrupos) => {
      allgrupos.map((allgrupos) => {
        if (misgrupos.id == allgrupos.id) {
          filtrados.push({
            id: allgrupos.id,
            nombre: allgrupos.nombre,
            informacion: allgrupos.informacion,
            descripcion: allgrupos.descripcion,
            img: allgrupos.img,
            verPosts: false,
          });
        }
      });
    });
    setFiltrados(filtrados);
  }, [misgrupos]);

  useEffect(() => {
    obtenerHome();
  }, []);

  const [verPosts, setVerPosts] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView vertical style={styles.scroll}>
        {grupo ? (
          <View style={styles.containcontent}>
            <View style={styles.containgroup}>
              <View style={styles.containgrouptitle}>
                <Text style={styles.txttitle}>Posts realizados: {cantidadposts}</Text>
              </View>
              <View style={styles.containgrouptitle}>
              <Text style={styles.txttitle}>Has publicado posts en los grupos:</Text>
              </View>
              {postgroupsunicos.map(postgroupsunicos=>{
                return(
                  <View style={styles.containpostbody2}>
                  <Text style={styles.txttitle2}>{postgroupsunicos.nombre}</Text>
                  </View>
                );
              })}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnverposts}
                onPress={() => setVerPosts(!verPosts)}
              >
                <Text style={styles.btnverpoststxt}>
                  {verPosts ? "Ocultar Posts" : "Ver Posts"}
                </Text>
              </TouchableOpacity>
              {verPosts ? (
                <View style={styles.containpostbody}>
                  <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Post
                        post={item}
                        verificado={verificado}
                        idUsuario={idUsuario}
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                      <>
                        {/*
                    <Image style={styles.img} source={{ uri: posts.imgUsuario }} />
                    <Text style={styles.txtdesctitle}>Descripción</Text>
                    <Text style={styles.txtdesc}>
                      Esta sería una Descripción. Así se vería si fuera una
                      Descripción con más de una línea.
                    </Text>
                    <Text style={styles.txtdesctitle}>Comentarios</Text>
                    <View style={styles.containusername}>
                      <Text style={styles.txtusername}>Username</Text>
                    </View>
                    <Text style={styles.txtcomment}>Comentario1</Text>
                    <View style={styles.containusername}>
                      <Text style={styles.txtusername}>Username2</Text>
                    </View>
                    <Text style={styles.txtcomment}>Comentario2</Text>
                        */}
                      </>
                    )}
                    ListFooterComponent={() => (
                      <View style={{ marginBottom: 10 }} />
                    )}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
