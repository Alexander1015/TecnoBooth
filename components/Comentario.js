import React from 'react'
import { View, Text, Image } from 'react-native'


const Comentario = ({comentarioUsuario}) => {
    const {comentario,usuario,imgUsuario}=comentarioUsuario
    return (
        <View style={{flexDirection:'row',marginVertical:10,borderRadius:40}}>
            <Image source={{uri:imgUsuario}} style={{width:50,height:50,borderRadius:'100%',marginRight:10}} />
            <View style={{backgroundColor:"#333436",padding:5}}>
                <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>{usuario}</Text>
                <Text style={{color:'white',fontSize:16}}>{comentario}</Text>
            </View>
        </View>
    )
}

export default Comentario
