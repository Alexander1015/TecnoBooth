import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
export default function Home(props) {
  const { navigation } = props;
  return (
    <ScrollView>
      <View>
        <Text>Aquí es Home</Text>
      </View>
    </ScrollView>
  );
}
