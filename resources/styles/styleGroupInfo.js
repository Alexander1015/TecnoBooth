import {
  StyleSheet,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors"

export const styles = StyleSheet.create({
  card_template: {
    marginBottom: 20,
  },
  card_image: {
    alignSelf: 'center',
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
    fontSize: 28,
    textAlign: 'center',
  },
  textAreaContainer: {
    marginBottom: 5,
    marginTop: 10,
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,

  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    color: Colors.SECUNDARY_COLOR,
  },
  contenedorpicker: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.SECUNDARY_COLOR,
    borderRadius: 15,
    marginTop: 30,
    alignSelf: "center"
  },
  estilopicker: {
    paddingRight: '85%',
    height: '100%',
    color: Colors.PRIMARY_COLOR,
  },
});