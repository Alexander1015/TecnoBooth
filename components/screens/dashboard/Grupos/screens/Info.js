import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import {styles} from '../../../../../resources/styles/styleGroupInfo'

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

