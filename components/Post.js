import React,{useEffect,useState} from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity,FlatList,TextInput } from 'react-native'
import useGrupos from '../hooks/useGrupos'
import Comentario from './Comentario'


const Post = ({post,verificado,idUsuario}) => {
    const {descripcion,img,usuario,id,id_usuario}=post
    
    
    const {obtenerComentarios,comentarios,agregarComentario}=useGrupos();
    
    const [verComentario, setVerComentario] = useState(false)
    const [value, setValue] = useState('')


    useEffect(()=>{
        if(verComentario){
            obtenerComentarios(id);
        }
    },[verComentario]);
    return (
        <View style={styles.container}>
            <Text style={styles.usuario}>{usuario}</Text>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri:img}}/>
            </View>
            <View style={styles.info}>
                <Text style={styles.texto}> {descripcion} </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.btnComentario} onPress={()=>setVerComentario(!verComentario)}>
                <Text style={[styles.texto,{color:'white'}]}>{verComentario?"Ocultar Comentarios":"Ver Comentarios"}</Text>
            </TouchableOpacity>
            {verComentario&&comentarios?(
                <View style={{backgroundColor:'#252527'}}>
                    {comentarios.length>0&&comentarios.map((comentario)=>(
                        <View key={comentario.id}>
                            <Comentario comentarioUsuario={comentario}/>
                        </View>
                    ))}
                   {verificado&&(
                       <TextInput style={styles.input} value={value} onChangeText={(value)=>setValue(value)} 
                       onKeyPress={({nativeEvent:{key}})=>{
                           if(key==="Enter"){
                                agregarComentario(value,idUsuario[0],id);
                                setValue("");
                           }
                       }} />
                   )} 
                </View>
            ):null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DBE5EA',
        margin: 15, borderRadius: 10,
        padding: 10
    },
    imgContainer: {
        alignItems: 'center',
        paddingTop:25
    },
    img: {
        width: 200,
        height: 200
    },
    texto: {
        fontSize: 18
    },
    usuario:{
        position:"absolute",
        top:5,
        left:10,
        fontSize:18,
        fontWeight:'bold',

    },
    info:{
        marginVertical:10
    },
    btnComentario:{
        marginVertical:10,
        paddingHorizontal:5,
      paddingVertical:10,
      backgroundColor:'#041F2E',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      marginHorizontal:10,
    },
    input:{
        paddingHorizontal:5,
        paddingVertical:10,
        fontSize:16,
        margin:5,
        backgroundColor:'white',
        borderRadius:20
    }
})

export default Post


