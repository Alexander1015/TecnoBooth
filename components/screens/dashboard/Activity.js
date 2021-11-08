import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import Post from "../../PostActivity";
import { styles } from "../../../resources/styles/styleActivity";
import firebase from "../../../database/firebase";
import Load from "../../Load";

const ActivityScreen = () => {
  const [usuario, setUsuario] = useState({ id: "" });
  const [misgruposconpost, setMisgruposconpost] = useState([]);
  const [postgroupsunicos, setPostgroupsunicos] = useState([]);
  const [loading, setLoading] = useState(true);

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
            const { id_grupo, descripcion, id_usuario, img } = doc.data();
            misgruposconpost.push({
              id: doc.id,
              id_grupo,
              descripcion,
              id_usuario,
              img,
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
                  verPosts: false,
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
    if (isSuscribe) {
      obtenerTotGrupos();
      setLoading(false);
    }
  }, [misgruposconpost]);

  useEffect(() => {
    isSuscribe = !isSuscribe;
  }, [isSuscribe]);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <ScrollView vertical style={styles.scroll}>
        <View style={styles.containpostbody}>
          <>
            {postgroupsunicos.map((datamis, i) => {
              return (
                <View key={i}>
                  <Text style={styles.titgrp}>Post de: {datamis.nombre}</Text>
                  {misgruposconpost.map((datapost, j) => {
                    if (datamis.id === datapost.id_grupo) {
                      return (
                        <View key={j}>
                          <Post
                            post={datapost}
                            verificado={true}
                            idUsuario={usuario}
                          />
                        </View>
                      );
                    }
                  })}
                </View>
              );
            })}
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
