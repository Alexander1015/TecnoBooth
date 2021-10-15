import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import {styles} from '../../../../../resources/styles/styleGroupInfo'
import firebase from '../../../../../database/firebase';
import { UserInterfaceIdiom } from "expo-constants";



export default function Info() {

  const [grupos, setGrupos] = useState([]);

    useEffect(() => {
      firebase.db.collection('Grupo').onSnapshot(querySnapshot => {
        const grupos = [];
        querySnapshot.docs.forEach(doc => {
          const { nombre, informacion, descripcion,img } = doc.data();
          grupos.push({
            id: doc.id,
            nombre,
            informacion,
            descripcion,
            img
          });
        });
        setGrupos(grupos);
      });
      
    }, []);


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        grupos.map((grupos,pos)=>{
          return(
            
        <>
        <View key={pos}>
          <View style={styles.card_template}>
              <Image
                style={styles.card_image}
                source={{uri:grupos.img}} />
          </View>
          <View>
              <Text style={styles.texto}>{grupos.nombre}</Text>
              <Text style={styles.texto}>Cantidad suscrita: #</Text>
          </View>
          <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                editable = {false}
                underlineColorAndroid="transparent"
                value={'Descripción: '+ grupos.descripcion}
                numberOfLines={5}
                multiline={true} />
          </View>
          <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                editable = {false}
                underlineColorAndroid="transparent"
                value={'Otra información: '+ grupos.informacion}
                numberOfLines={5}
                multiline={true} />
          </View>
        </View>
        </>
     
          );
        })
      
      } 
       </ScrollView>
    </View>
  );
}

