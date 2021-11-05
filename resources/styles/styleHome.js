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
      marginVertical:15
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
    btnText:{
      color:'white',
      fontSize:16
    }
})


