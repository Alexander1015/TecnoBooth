import React,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity,FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import {styleHome} from "../../../../resources/styles/styleHome";
import useGrupos from "../../../../hooks/useGrupos";
import Post from '../../../Post';
import { NewPost } from '../../../NewPost';
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
        {grupo?(
          <View style={styleHome.containerInfo}>
            
              <View style={{ flex: 1, alignSelf: "center" }}>
                <FlatList 
                  data={posts}
                  keyExtractor={(item)=>item.id}
                  renderItem={({item})=><Post post={item} verificado={verificado} idUsuario={idUsuario}/>}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={()=>(
                    <>
                    <Image source={{uri:grupo.img}} style={styleHome.img}/>
                    <View style={styleHome.contenedorOpciones}>
                      <Text style={styleHome.nombre}>{grupo.nombre}</Text>
                      <TouchableOpacity activeOpacity={0.8} style={styleHome.btn} onPress={()=>setNuevoPost(true)}>
                        <Text style={styleHome.btnText}>Nuevo Post</Text>
                      </TouchableOpacity>
                      {!verificado?(
                      <TouchableOpacity activeOpacity={0.8} style={styleHome.btn} onPress={()=>{
                        subscribirse('MUutMUnTx8tWEGLvqrIc',idUsuario[0]);
                      }}>
                        <Text style={styleHome.btnText}>Suscribirse</Text>
                      </TouchableOpacity>
                      ):null}
                    </View>
                    {nuevoPost?<NewPost subirImagen={subirImagen} crearPost={crearPost}  setNuevoPost={setNuevoPost}/>:null}
                    </>
                  )}
                  ListFooterComponent={() => <View style={{ marginBottom: 100 }} />}
                />
              </View>
          </View>
        ):null}
      </View>
  );
}
