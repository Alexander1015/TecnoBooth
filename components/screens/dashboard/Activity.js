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

const ActivityScreen = (props) => {
  const { userEmail } = props;
  const { navigation, route } = props;
  const { width } = Dimensions.get("window");

  console.log(route);
  const {
    grupo,
    posts,
    integrantes,
    idUsuario,
    verificado,
    subscribirse,
    obtenerHome,
    subirImagen,
    crearPost,
  } = useGrupos("MUutMUnTx8tWEGLvqrIc");

  const [nuevoPost, setNuevoPost] = useState(false);

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
              <Text style={styles.txttitle}>Todos mis posts</Text>
            </View>
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
