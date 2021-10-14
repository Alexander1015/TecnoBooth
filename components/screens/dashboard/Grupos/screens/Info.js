import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
export default function Info() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card_template}>
          <Image
            style={styles.card_image}
            source={require('../../../../../resources/img/favicon.png')}
          />
        </View>
        <View>
          <Text style={styles.texto}>Grupo A</Text>
          <Text style={styles.texto}>Cantidad suscrita: #</Text>
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Descripción general"
            placeholderTextColor="grey"
            numberOfLines={5}
            multiline={true}
          />
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Otra descripción"
            placeholderTextColor="grey"
            numberOfLines={5}
            multiline={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card_template: {
    marginBottom: 20,
  },
  card_image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#041F2E',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  texto: {
    color: '#DBE5EA',
    fontSize: 18,
    textAlign: 'center',
  },
  textAreaContainer: {
    marginBottom:5,
    marginTop:10,
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 5
    
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    color: '#DBE5EA'
  }
});