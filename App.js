import React, { useState, useEffect } from "react";
import { View, ScrollView, Button, ActivityIndicator } from "react-native";
import firebase from "./database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const App = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.db.collection('Usuarios').onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.docs.forEach(doc => {
        const { nombre, apellido, usuario } = doc.data();
        users.push({
          id: doc.id, //Obtenemos el Id que genera en automatico Firebase
          nombre,
          apellido,
          usuario,
        });
        setLoading(false);
      });
      setUsers(users);
    });
  }, []);
  //Es un mini Loader
  if (loading) {
    return(
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View> 
    );
  }

  return(
    <ScrollView style={{marginTop: 20,}}>
      {
        users.map(user => {
          return(
            <ListItem key={user.id} bottomDivider>
              <ListItem.Chevron />
              <ListItem.Content>
                <ListItem.Title>{ user.nombre } { user.apellido }</ListItem.Title>
                <ListItem.Subtitle>{ user.usuario }</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })  
      }
    </ScrollView>
  );
}

export default App;