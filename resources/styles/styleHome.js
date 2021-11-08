import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import Colors from "../utils/Colors"

const {width}=Dimensions.get('window');

export const styleHome = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingHorizontal: 10,
        paddingTop: Constants.statusBarHeight
    },
    containerInfo:{
      width: width>=1000?'50%':"90%",
      alignItems:'center',
      flex: 1,
      marginTop:10
    },
    img:{
      width: 300,
      height: 300,
    },
    contenedorOpciones:{
      // flexDirection:'row',
      paddingVertical:10,
      paddingHorizontal:15,
      alignItems:'center',
    },
    nombre:{
      fontSize:40,
      fontWeight:'bold',
      color:'white'
    },
    btn:{
      paddingHorizontal:5,
      paddingVertical:10,
      backgroundColor:'#969C9F',
      borderRadius:10,
      marginHorizontal:10,
    },

    btnsuscribe:{
      flexDirection: "row",
      paddingHorizontal:5,
      marginTop:5,
      paddingVertical:10,
      backgroundColor:'#969C9F',
      borderRadius:10,
      marginHorizontal:10,
    },
    btnText:{
      color:'white',
      fontSize:16
    },
    hr: {
      borderColor: Colors.SECUNDARY_COLOR,
      borderBottomWidth: 1,
      width: "90%",
  },
  grpbtn: {
      marginTop: 5,
  },
  btn2: {
      backgroundColor: Colors.SECUNDARY_COLOR,
      width: "100%",
      padding: 5,
      borderRadius: 5,
  },
  btndecorado: {
      margin: 1,
      borderColor: Colors.PRIMARY_COLOR,
      borderWidth: 1,
      padding: 5,
  },
  txtbtn: {
      color: Colors.PRIMARY_COLOR,
      fontSize: 15,
      textAlign: "center",
      fontWeight: "bold",
  },
  viewbtndecor: {
    marginTop:15,
    width: "90%",
},
texto: {
  color: Colors.SECUNDARY_COLOR,
  fontSize: 28,
  textAlign: "center",
},
card_template: {
  marginBottom: 20,
},
card_image: {
  alignSelf: "center",
  width: 300,
  height: 200,
  borderRadius: 10,
  marginTop: 30,
},
})


