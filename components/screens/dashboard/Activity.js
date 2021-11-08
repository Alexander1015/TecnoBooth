import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import useGrupos from "../../../hooks/useActivity";
import Post from "../../Post";
import { styles } from "../../../resources/styles/styleActivity";
import firebase from "../../../database/firebase";

const ActivityScreen = (route) => {
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

  const [usuario, setUsuario] = useState("");
  const [misgruposconpost, setMisgruposconpost] = useState([]);
  const [postgroupsunicos, setPostgroupsunicos] = useState([]);

  let isSuscribe = false;

  async function obtenerUser() {
    const { email } = firebase.auth.currentUser;
    firebase.db
      .collection("Usuarios")
      .where("correo", "==", email)
      .onSnapshot((querySnapshot) => {
        const user = [];
        querySnapshot.docs.forEach((doc) => {
          user.push({
            id: doc.id,
          });
        });
        user.map((user) => {
          setUsuario(user.id);
        });
      });
  }

  async function obtenerGruposWPost() {
    firebase.db
      .collection("Post")
      .where("id_usuario", "==", usuario)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const misgruposconpost = [];
          querySnapshot.docs.forEach((doc) => {
            const { id_grupo } = doc.data();
            misgruposconpost.push({
              id: doc.id,
              id_grupo,
            });
          });
          setMisgruposconpost(misgruposconpost);
        } else {
          setMisgruposconpost([]);
        }
      });
  }

  async function obtenerTotGrupos() {
    firebase.db.collection("Grupo").onSnapshot((querySnapshot) => {
      if (querySnapshot.docs.length > 0 && misgruposconpost.length > 0) {
        const allgrupos = [];
        querySnapshot.docs.forEach((doc) => {
          const { nombre, informacion, descripcion, img } = doc.data();
          misgruposconpost.map((i) => {
            if (i.id_grupo === doc.id) {
              let exist = 0;
              if (allgrupos.length > 0) {
                allgrupos.map((j) => {
                  if (j.id === i.id_grupo) {
                    exist++;
                  }
                });
              }
              if (exist === 0) {
                allgrupos.push({
                  id: doc.id,
                  nombre,
                  informacion,
                  descripcion,
                  img,
                });
              }
            }
          });
        });
        setPostgroupsunicos(allgrupos);
      } else {
        setPostgroupsunicos([]);
      }
    });
  }

  useEffect(() => {
    isSuscribe = !isSuscribe;
    if (isSuscribe) obtenerUser();
  }, []);

  useEffect(() => {
    isSuscribe = !isSuscribe;
    if (isSuscribe) obtenerGruposWPost();
  }, [usuario]);

  useEffect(() => {
    isSuscribe = !isSuscribe;
    if (isSuscribe) obtenerTotGrupos();
  }, [misgruposconpost]);

  //Obtengo todos los integrantes
  useEffect(() => {
    isSuscribe = !isSuscribe;
    if (isSuscribe) obtenerIntg();
  }, [usuario]);

  useEffect(() => {
    isSuscribe = !isSuscribe;
  }, [isSuscribe]);

  useEffect(() => {
    obtenerHome();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView vertical style={styles.scroll}>
        {grupo ? (
          <View style={styles.containcontent}>
            <View style={styles.containgroup}>
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
                  />
                </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
