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
  } = useGrupos("MUutMUnTx8tWEGLvqrIc");

  const [usuario, setUsuario] = useState("");
  const [misgruposconpost, setMisgruposconpost] = useState([]);
  const [postgroupsunicos, setPostgroupsunicos] = useState([]);
  const [cantidadposts, setCantidadPosts] = useState([]);

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
          setCantidadPosts(misgruposconpost.length);
        }
        else {
          setMisgruposconpost([]);
          setCantidadPosts(0);
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
                  verPosts: false,
                });
              }
            }
          })
        });
        setPostgroupsunicos(allgrupos);
      }
      else {
        setPostgroupsunicos([]);
        setCantidadPosts(0);
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

  const [verPosts, setVerPosts] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView vertical style={styles.scroll}>
        {grupo ? (
          <View style={styles.containcontent}>
            <View style={styles.containgroup}>
              <View style={styles.containgrouptitle}>
                <Text style={styles.txttitle}>
                  Posts realizados: {cantidadposts}
                </Text>
              </View>
              <View style={styles.containgrouptitle}>
                <Text style={styles.txttitle}>
                  Has publicado posts en los grupos:
                </Text>
              </View>
              {postgroupsunicos.map((postgroupsunicos) => {
                return (
                  <View style={styles.containpostbody2}>
                    <Text style={styles.txttitle2}>
                      {postgroupsunicos.nombre}
                    </Text>
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
                        {
                          /*
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
                          */
                        }
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
