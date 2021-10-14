import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors"

export const styles = StyleSheet.create({
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
      backgroundColor: Colors.PRIMARY_COLOR,
      paddingHorizontal: 10,
      paddingBottom: 10,
      paddingTop: Constants.statusBarHeight
    },
    texto: {
      color: Colors.SECUNDARY_COLOR,
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
      color: Colors.SECUNDARY_COLOR
    }
  });