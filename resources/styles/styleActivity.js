import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_COLOR,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: Constants.statusBarHeight,
  },
  scroll: {
    width: "95%",
    height: "100%",
  },
  containgroup: {
    borderColor: Colors.SECUNDARY_COLOR,
    borderBottomWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
  },
  containgrouptitle: {
    backgroundColor: Colors.SECUNDARY_COLOR,
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  txttitle: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 24,
    textAlign: "center",
  },
  containpostbody: {
    borderWidth: 2,
    borderColor: Colors.SECUNDARY_COLOR,
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
  },
  img: {
    alignSelf: "center",
    width: "90%",
    height: 100,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  txtdesctitle: {
    color: Colors.SECUNDARY_COLOR,
    fontSize: 19,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  txtdesc: {
    color: Colors.SECUNDARY_COLOR,
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
    width:'90%',
    alignSelf:'center',
  },
  containusername:{
    backgroundColor:Colors.SECUNDARY_COLOR,
    borderRadius:20,
    padding:3,
    marginBottom: 10,
    marginLeft:15,
    marginRight:15,
  },
  txtusername: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 16,
    fontWeight:"bold",
    textAlign: "center",
  },
  txtcomment: {
    color: Colors.SECUNDARY_COLOR,
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
    width:'90%',
    alignSelf:'center',
  },
});