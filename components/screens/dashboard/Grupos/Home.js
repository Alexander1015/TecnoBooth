import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity,FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import {styleHome} from "../../../../resources/styles/styleHome";
import useGrupos from "../../../../hooks/useGrupos";
import Post from '../../../Post';
import { NewPost } from '../../../NewPost';
import { FontAwesome5 } from "@expo/vector-icons";
export default function Home(route) {
  const { idgrupo } = route;
  const { width } = Dimensions.get("window");
  
  //console.log(idgrupo);
  const { 
    grupo, 
    posts, 
    integrantes, 
    idUsuario,
    verificado,
    subscribirse,
    obtenerHome,
    subirImagen,
    crearPost
  } = useGrupos(idgrupo);
  //} = useGrupos('MUutMUnTx8tWEGLvqrIc');

  const [nuevoPost,setNuevoPost]=useState(false);
  

  useEffect(() => {
    obtenerHome();
  }, []);

  return (
    <View style={styleHome.container}>
      {grupo ? (
        <View style={styleHome.containerInfo}>
          <View style={{ flex: 1, alignSelf: "center" }}>
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
                  <View style={styleHome.card_template}>
                    <Image
                      style={styleHome.card_image}
                      source={{ uri: grupo.img }}
                    />
                  </View>
                  <View style={styleHome.contenedorOpciones}>
                  <Text style={styleHome.texto}>
                      <FontAwesome5 name="angle-double-left" size={18} />
                      {grupo.nombre}
                      <FontAwesome5 name="angle-double-right" size={18} />
                    </Text>
                  {!verificado ? (
                      <View style={[styleHome.viewbtndecor]}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styleHome.btn2}
                          onPress={() => {
                            //subscribirse('MUutMUnTx8tWEGLvqrIc',idUsuario[0]);idgrupo
                            subscribirse(idgrupo, idUsuario[0]);
                          }}
                        >
                          <View style={styleHome.btndecorado}>
                            <Text style={styleHome.txtbtn}>Suscribirse</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    {verificado ? (
                    <View style={[styleHome.viewbtndecor]}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styleHome.btn2}
                      onPress={() => setNuevoPost(true)}
                    >
                      <View style={styleHome.btndecorado}>
                        <Text style={styleHome.txtbtn}>Nuevo Post</Text>
                      </View>
                    </TouchableOpacity>
                    </View>
                    ) : null}
                  </View>
                  {nuevoPost ? (
                    <NewPost
                      subirImagen={subirImagen}
                      crearPost={crearPost}
                      setNuevoPost={setNuevoPost}
                    />
                  ) : null}
                </>
              )}
              ListFooterComponent={() => <View style={{ marginBottom: 100 }} />}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}
