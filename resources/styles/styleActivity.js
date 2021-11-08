import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors";
import { color } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.PRIMARY_COLOR,
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight,
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  containcontent: {
    width: width >= 1000 ? "50%" : "90%",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    alignSelf: "center",
  },
  containgroup: {
    borderColor: Colors.SECUNDARY_COLOR,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    marginBottom: 20,
  },
  containgrouptitle: {
    backgroundColor: Colors.SECUNDARY_COLOR,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 39,
    marginBottom: 20,
  },
  txttitle: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 24,
    textAlign: "center",
  },
  txttitle2: {
    color: Colors.SECUNDARY_COLOR,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  containpostbody2: {
    borderWidth: 2,
    borderColor: Colors.SECUNDARY_COLOR,
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
  },
  btnverposts: {
    marginVertical: 10,
    paddingHorizontal: 39,
    paddingVertical: 10,
    backgroundColor: Colors.SECUNDARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  btnverpoststxt: {
    fontSize: 20,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
  containpostbody: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.SECUNDARY_COLOR,
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
  },
  img: {
    alignSelf: "center",
    height: 100,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    width: 290,
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
    alignSelf: "center",
  },
  containusername: {
    flex: 1,
    backgroundColor: Colors.SECUNDARY_COLOR,
    borderRadius: 20,
    padding: 3,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  txtusername: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  txtcomment: {
    color: Colors.SECUNDARY_COLOR,
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
    alignSelf: "center",
  },
  titgrp: {
    color: Colors.SECUNDARY_COLOR,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },
});
