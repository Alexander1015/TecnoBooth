import React from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "../../../../../resources/styles/styleDashboard";
export default function Info() {
  return (
    <View style={Styles.container}>
      <ScrollView vertical>
        <Text style={Styles.texto}>Aquí es Integrantes</Text>
      </ScrollView>
    </View>
  );
}
